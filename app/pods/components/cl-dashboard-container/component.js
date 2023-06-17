import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import _ from 'npm:lodash';
import PaginatedModel from 'dotamastery/utils/paginated-model';

const { inject } = Ember;
const { assign } = Object;

export default Ember.Component.extend({
  store: inject.service(),
  classNames: ['cl-dashboard-container'],
  tagName: 'section',
  matches: null,
  jobStatus: null,

  init() {
    this._super(...arguments);
    this.set('paginatedModel', PaginatedModel.create({ model: this.get('matches') }));

    if (this.get('jobStatus.isRunning')) {
      this.get('pollJobStatus').perform();
    }
  },

  syncRecentMatches: task(function * () {
    try {
      yield this.get('store').createRecord('recent-matches-sync', { id: _.uniqueId() }).save();
    } catch(e) {
      if (!e.isAdapterError) { throw(e); }
    }

    yield this.get('pollJobStatus').perform();
  }).drop(),

  pollJobStatus: task(function * () {
    yield timeout(3000);
    const jobStatus = this.get('jobStatus');
    yield jobStatus.reload();
    const matches = yield this._load();
    const collection = this.get('paginatedModel.collection');
    collection.setObjects(matches.toArray().concat(collection).uniqBy('id'));
    this.set('paginatedModel.model.meta', matches.get('meta'));
    
    if (jobStatus.get('isRunning')) {
      yield this.get('pollJobStatus').perform();
    }
  }),

  _load(page) {
    return this.get('store').query('match', assign({}, this.get('matches.query'), { page }));
  },

  actions: {
    loadMore(page) {
      return this._load(page);
    }
  }
});
