variable "domain" {
  default = "dotamastery.io"
}

variable "bucket" {
  default = "dotamastery-client-production"
}

variable "regions" {
  type = "map"

  default = {
    "eu" = "eu-west-1"
    "us" = "us-east-1"
  }
}

variable "dnsimple_token" {}
variable "dnsimple_account" {}
