import Component from '@ember/component';
import layout from '../../templates/components/ember-sundries/print-object';
import isPromise from 'ember-sundries/utils/is-promise';

export default Component.extend({
  tagName: "",
  layout,

  didReceiveAttrs() {
this._super();
    console.log('didReceiveAttrs')
    this.send('checkPromise');
  },

  didUpdateAttrs() {
this._super();
    this.send('checkPromise');
  },

  actions: {
    checkPromise() {
      const object = this.object;
      if (isPromise(object)) {
        object.then(res => {
          this.send('parseObject', res);
        });
      } else {
        this.send('parseObject', object);
      }
    },
    
    parseObject(object) {
      if (object.toJSON) {
        object = object.toJSON({includeId: true});
      }
      (this.keysToRemove || []).forEach(key => {
        delete object[key]
      })
      this.set('parsed', JSON.stringify(object, null, 2))
    }
  }
});
