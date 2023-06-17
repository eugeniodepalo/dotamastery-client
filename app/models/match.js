import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  playerParticipations: hasMany(),
  matchComparisons: hasMany(),
  otherMatchComparisons: hasMany('matchComparisons', { inverse: 'otherMatch' }),
  originalId: attr('number'),
  averageMmr: attr('number'),
  dotabuffUrl: attr('string'),
  startedAt: attr('date'),
  winner: attr('string')
});
