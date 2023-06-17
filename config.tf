// providers

provider "aws" {
  region = "${var.regions["eu"]}"
}

provider "aws" {
  alias  = "us"
  region = "${var.regions["us"]}"
}

provider "dnsimple" {
  token   = "${var.dnsimple_token}"
  account = "${var.dnsimple_account}"
}

// backend

terraform {
  backend "s3" {
    bucket = "dotamastery-terraform"
    key    = "dotamastery-client-production"
    region = "eu-west-1"
  }
}

// s3

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = "${aws_s3_bucket.bucket.id}"
  policy = "${data.aws_iam_policy_document.policy.json}"
}

data "aws_iam_policy_document" "policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

// cdn

data "aws_acm_certificate" "certificate" {
  provider = "aws.us"
  domain   = "${var.domain}"
}

resource "aws_cloudfront_distribution" "cdn" {
  price_class         = "PriceClass_200"
  default_root_object = "index.html"
  enabled             = true

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.bucket.id}"
    domain_name = "${aws_s3_bucket.bucket.bucket_domain_name}"
  }

  custom_error_response {
    error_code            = "404"
    error_caching_min_ttl = "360"
    response_code         = "200"
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl          = 0
    default_ttl      = 3600
    max_ttl          = 86400
    target_origin_id = "origin-bucket-${aws_s3_bucket.bucket.id}"

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "${data.aws_acm_certificate.certificate.arn}"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

  # viewer_certificate {
  #   cloudfront_default_certificate = true
  # }

  aliases = ["${var.domain}"]
}

// dns

resource "dnsimple_record" "alias" {
  domain = "${var.domain}"
  name   = ""
  value  = "${aws_cloudfront_distribution.cdn.domain_name}"
  type   = "ALIAS"
}

resource "dnsimple_record" "www" {
  domain = "${var.domain}"
  name   = "www"
  value  = "https://${var.domain}"
  type   = "URL"
}

// outputs

output "cdn_id" {
  value = "${aws_cloudfront_distribution.cdn.id}"
}

output "bucket_name" {
  value = "${aws_s3_bucket.bucket.bucket}"
}

output "bucket_region" {
  value = "${aws_s3_bucket.bucket.region}"
}
