import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Mixin.create(AuthenticatedRouteMixin, {
  authenticationRoute: 'index'
});
