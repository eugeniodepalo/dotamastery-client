import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  model: computed({
    set(_, value) {
      this.set('page', 1);
      this.set('collection', value && value.toArray());

      return value;
    }
  }),

  hasMore: computed('model.meta', 'collection.length', function() {
    return this.get('collection.length') < this.get('model.meta.total-count');
  }),
});
