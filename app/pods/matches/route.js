import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  matchStore: inject.service(),

  model(params) {
    return RSVP.hash({
      heroes: this.store.findAll('hero'),
      matches: this.get('matchStore').query(params)
    });
  },

  setupController(controller, model) {
    controller.setProperties(model);
  }
});
