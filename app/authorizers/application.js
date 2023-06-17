import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

export default BaseAuthorizer.extend({
  authorize(data, block) {
    block('Authorization', `Bearer ${data.token}`);
  }
});
