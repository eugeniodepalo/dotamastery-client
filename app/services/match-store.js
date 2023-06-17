import Ember from 'ember';

const { inject } = Ember;

export default Ember.Service.extend({
  store: inject.service(),

  query(params) {
    return this.get('store').query('match', {
      hero_id: params.heroId,
      lanes: params.lanes,
      include_losses: params.includeLosses,
      side: params.side,
      role: params.role,
      regions: params.regions,
      duration: params.duration,
      sort: params.sort,
      page: params.page,
      per_page: params.perPage,
      user_id: params.userId,
      include: (params.include || []).join(',')
    });
  }
});
