import Ember from 'ember';
import { task } from 'ember-concurrency';
import titleize from 'npm:titleize';
import PaginatedModel from 'dotamastery/utils/paginated-model';
import { defaultHeroParams } from 'dotamastery/pods/matches/controller';

const { computed, inject } = Ember;
const { assign, keys } = Object;
const paramKeys = keys(defaultHeroParams).concat(['sort', 'regions', 'duration']);

function buildOptions(values) {
  return values.map(function(value) {
    return {
      value,
      label: titleize(value.replace('_', ' '))
    };
  });
}

export default Ember.Component.extend({
  matchStore: inject.service(),
  classNames: ['cl-matches-container'],
  heroes: null,
  matches: null,
  query: null,
  side: null,
  sort: null,
  lanes: null,
  heroId: null,
  includeLosses: null,
  laneOptions: buildOptions(['safelane', 'middle', 'offlane', 'jungle', 'enemy_jungle', 'roaming']),
  sideOptions: buildOptions(['radiant', 'dire']),
  roleOptions: buildOptions(['core', 'support']),

  regionOptions: [
    { value: 'us_west', label: 'US West' },
    { value: 'us_east', label: 'US East' },
    { value: 'europe', label: 'Europe' },
    { value: 'japan', label: 'Japan' },
    { value: 'se_asia', label: 'SE Asia' },
    { value: 'dubai', label: 'Dubai' },
    { value: 'russia', label: 'Russia' },
    { value: 'south_america', label: 'South America' },
    { value: 'south_africa', label: 'South Africa' },
    { value: 'china', label: 'China' },
    { value: 'india', label: 'India' }
  ],

  durationOptions: [
    { value: (30 * 60).toString(), label: 'More than 30 minutes' },
    { value: (50 * 60).toString(), label: 'More than 50 minutes' },
    { value: (70 * 60).toString(), label: 'More than 70 minutes' }
  ],

  sortOptions: [
    { value: 'started_at', label: 'Recent' },
    { value: 'average_mmr', label: 'Average MMR' }
  ],

  heroOptions: computed('heroes', function() {
    return this.get('heroes').sortBy('name');
  }),

  selectedSortOption: computed('sort', function() {
    return this.get('sortOptions').findBy('value', this.get('sort'));
  }),

  selectedLaneOptions: computed.map('lanes', function(lane) {
    return this.get('laneOptions').findBy('value', lane);
  }),

  selectedSideOption: computed('side', function() {
    return this.get('sideOptions').findBy('value', this.get('side'));
  }),

  selectedRoleOption: computed('role', function() {
    return this.get('roleOptions').findBy('value', this.get('role'));
  }),

  selectedRegionOptions: computed.map('regions', function(region) {
    return this.get('regionOptions').findBy('value', region);
  }),

  selectedDurationOption: computed('duration', function() {
    return this.get('durationOptions').findBy('value', this.get('duration'));
  }),

  params: computed(...paramKeys, function() {
    return this.getProperties(...paramKeys);
  }),

  hero: computed('heroId', 'heroes', function() {
    return this.get('heroes').findBy('id', this.get('heroId'));
  }),

  init() {
    this._super(...arguments);
    this.set('paginatedModel', PaginatedModel.create({ model: this.get('matches') }));
  },

  _load(page) {
    return this.get('matchStore').query(assign({}, this.get('params'), { page }));
  },

  reload: task(function * () {
    const matches = yield this._load();
    this.set('paginatedModel.model', matches);
  }).restartable(),

  actions: {
    selectHero(hero) {
      if (hero) {
        this.set('heroId', hero.get('id'));
      } else {
        this.setProperties(defaultHeroParams);
      }

      this.get('reload').perform();
    },

    selectSingle(property, option) {
      this.set(property, option && option.value);
      this.get('reload').perform();
    },

    selectMultiple(property, options) {
      this.set(property, options.mapBy('value'));
      this.get('reload').perform();
    },

    updateIncludeLosses(value) {
      this.set('includeLosses', value);
      this.get('reload').perform();
    },

    loadMore(page) {
      return this._load(page);
    }
  }
});
