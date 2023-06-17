import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    this.controllerFor('application').set('shouldShowFooter', false);
  },

  deactivate() {
    this.controllerFor('application').set('shouldShowFooter', true);
  }
});
