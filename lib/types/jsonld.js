'use strict';

var JSONMimeType = require('./json');

module.exports = JSONMimeType.extend('JSONLD', {
  qualified: {
    value: 'application/ld+json'
  },
  simplified: {
    value: 'jsonld'
  },
  extensions: {
    default: function () {
      return ['.jsonld'];
    }
  }
});