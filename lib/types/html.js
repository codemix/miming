'use strict';

var MimeType = require('../mime-type'),
    Errors = require('../errors');

module.exports = MimeType.extend('HTML', {
  qualified: {
    value: 'text/html'
  },
  simplified: {
    value: 'html'
  },
  extensions: {
    default: function () {
      return ['.html', '.htm'];
    }
  },
  format: function (input) {
    if (!input) {
      return '';
    }
    else if (typeof input === 'string') {
      return input;
    }
    else if (input && typeof input.toHTML === 'function') {
      return input.toHTML();
    }
    else {
      return new Errors.FormatError('Cannot convert ' + (typeof input) + ' to HTML.');
    }
  }
});