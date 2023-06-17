import ENV from 'dotamastery/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.APP.apiHost,
  authorizer: 'authorizer:application',

  headers: {
    Accept: 'application/json'
  },

  shouldBackgroundReloadAll() {
    return false;
  },

  shouldBackgroundReloadRecord() {
    return false;
  },

  shouldReloadAll() {
    return true;
  }
});
