import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  session: inject.service(),
  classNames: ['cl-application-container'],
  tagName: 'section',
  shouldShowFooter: null,

  actions: {
    login() {
      this.get('session').authenticate('authenticator:application', 'steam');
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
