'use strict';
var Classing = require('classing');

module.exports = Classing.create('MimeType', {
  qualified: {
    value: '*/*'
  },
  simplified: {
    value: '*'
  },
  alternates: {
    default: function () {
      return [];
    }
  },
  extensions: {
    default: function () {
      return [];
    }
  }
});