import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  classNames: ['cl-show-more-button'],
  paginatedModel: null,
  onLoadMore: function() {},

  showMore: task(function * () {
    this.incrementProperty('paginatedModel.page');
    const model = yield this.onLoadMore(this.get('paginatedModel.page'));
    this.get('paginatedModel.collection').pushObjects(model.toArray());
  }).restartable()
});
