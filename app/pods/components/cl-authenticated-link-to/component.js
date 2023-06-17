import Ember from 'ember';

const { inject } = Ember;

const AuthenticatedLinkToComponent = Ember.Component.extend({
  session: inject.service(),
  tagName: '',

  actions: {
    login() {
      this.get('session').authenticate('authenticator:application', 'steam');
    }
  }
});

AuthenticatedLinkToComponent.reopenClass({
  positionalParams: 'params'
});

export default AuthenticatedLinkToComponent;
