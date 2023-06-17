import Ember from 'ember';

export const defaultHeroParams = {
  heroId: null,
  side: null,
  includeLosses: false,
  lanes: [],
  role: null
};

export default Ember.Controller.extend({
  queryParams: ['side', 'sort', 'lanes', 'role', 'regions', 'duration', {
    heroId: 'hero_id',
    includeLosses: 'include_losses'
  }],

  sort: 'started_at',
  regions: [],
  duration: null,
  matches: null,
  heroes: null
}, defaultHeroParams);
