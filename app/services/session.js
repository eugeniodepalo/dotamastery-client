import SessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';

const { inject, RSVP } = Ember;

export default SessionService.extend({
  store: inject.service(),
  currentUser: null,

  fetchCurrentUser() {
    if (this.get('isAuthenticated')) {
      return this.get('store').findRecord('user', this.get('data.authenticated.userId')).then((user) => {
        this.set('currentUser', user);
        window.drift.identify(user.get('id'), { name: user.get('name') });
      });
    }

    return RSVP.resolve(null);
  }
});
