import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['cl-match'],
  tagName: 'li',
  match: null,
  comparison: null,
  highlightedHero: null,

  highlightedPlayerParticipation: computed('highlightedHero', 'match', function() {
    return this.get('match.playerParticipations').findBy('hero.id', this.get('highlightedHero.id'));
  }),

  playerParticipationGroups: computed('_playerParticipationGroups', function() {
    return this.get('_playerParticipationGroups').map(function(playerParticipations) {
      return playerParticipations.sortBy('slot');
    });
  }),

  winner: computed('match', function() {
    return `${this.get('match.winner').capitalize()} win`;
  }),

  comparisonSimilarity: computed('comparison', function() {
    return Math.floor(this.get('comparison.similarity') * 100);
  }),

  _playerParticipationGroups: computed('match', function() {
    return ['radiant', 'dire'].map((side) => {
      return this.get('match.playerParticipations').filterBy('side', side);
    });
  }),
});
