import Ember from 'ember';
import AuthenticatedRouteMixin from 'dotamastery/mixins/authenticated-route';

const { inject, RSVP } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  matchStore: inject.service(),
  session: inject.service(),

  model() {
    return RSVP.hash({
      matches: this.get('matchStore').query({
        userId: this.get('session.currentUser.id'),
        perPage: 5,

        include: [
          'player_participations.hero',
          'match_comparisons.other_match.player_participations.hero',
          'match_comparisons.other_match.player_participations.player'
        ]
      }),

      jobStatus: this.store.findRecord('job-status', 'sync-recent-matches')
    });
  },

  setupController(controller, model) {
    controller.setProperties(model);
  }
});
