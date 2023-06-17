import Ember from 'ember';

const { inflector } = Ember.Inflector;

export function initialize() {
  inflector.irregular('hero', 'heroes');
}

export default { name: 'inflector', initialize };
