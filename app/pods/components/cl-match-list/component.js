import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cl-match-list'],
  tagName: 'li',
  model: null,
  highlightedHero: null,
  isShowingComparisons: false
});
