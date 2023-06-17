import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import Ember from 'ember';

const { inject } = Ember;

export default ToriiAuthenticator.extend({
  torii: inject.service()
});
