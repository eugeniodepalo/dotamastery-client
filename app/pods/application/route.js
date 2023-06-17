import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: inject.service(),

  beforeModel() {
    return this.get('session').fetchCurrentUser();
  },

  sessionAuthenticated() {
    this.refresh();
    this.transitionTo('dashboard');
  }
});
