import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  otherMatch: belongsTo('match', { inverse: 'otherMatchComparisons' }),
  similarity: attr('number')
});
