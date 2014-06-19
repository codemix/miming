'use strict';

var HTML = require('./html');

module.exports = HTML.extend('XHTML', {
  qualified: {
    value: 'application/xhtml+xml'
  },
  simplified: {
    value: 'xhtml'
  },
  extensions: {
    default: function () {
      return ['.xhtml'];
    }
  }
});