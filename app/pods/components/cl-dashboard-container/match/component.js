import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  session: inject.service(),
  classNames: ['cl-dashboard-container-match'],
  match: null,

  userPlayerParticipationLane: computed('userPlayerParticipation', function() {
    return this.get('userPlayerParticipation.lane').capitalize();
  }),

  userPlayerParticipation: computed('match', function() {
    return this
      .get('match.playerParticipations')
      .findBy('player.originalId', this.get('session.currentUser.originalId'));
  }),

  matchComparisons: computed('match', function() {
    return this.get('match.matchComparisons').sortBy('similarity').reverse();
  })
});
