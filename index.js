'use strict';

module.exports = {
  name: 'ember-sundries',
  included: function (/* app */) {
    this._super.included.apply(this, arguments);
  },
  options: {
    sassOptions: {
      includePaths: ['node_modules/cropperjs/src/css'],
    },
  },
};
