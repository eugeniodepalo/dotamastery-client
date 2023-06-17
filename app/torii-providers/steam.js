import BaseProvider from 'torii/providers/base';
import ENV from 'dotamastery/config/environment';

const { assign } = Object;

export default BaseProvider.extend({
  name: 'steam',

  open(options) {
    return this.get('popup')
      .open(`//${ENV.APP.apiHost}/auth/steam`, ['token', 'user_id'], assign({ width: 800, height: 600 }, options))
      .then(function(authData) {
        return { token: authData.token, userId: authData.user_id };
      });
  },

  fetch(data) {
    return data;
  }
});
