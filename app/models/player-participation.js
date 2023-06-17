import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  hero: belongsTo(),
  player: belongsTo(),
  lane: attr('string'),
  side: attr('string'),
  slot: attr('number')
});
