'use strict';

var TextMimeType = require('./text'),
    Errors = require('../errors'),
    Promise = require('bluebird');

module.exports = TextMimeType.extend('JSON', {
  qualified: {
    value: 'application/json'
  },
  simplified: {
    value: 'json'
  },
  extensions: {
    default: function () {
      return ['.json'];
    }
  },
  pretty: {
    value: false
  },
  format: function (input) {
    try {
      return JSON.stringify(input, null, this.pretty ? 2 : undefined);
    }
    catch (e) {
      return e;
    }
  },
  parse: function (req) {
    return this.__super__.parse.call(this, req)
    .then(function (value) {
      return [JSON.parse(value)];
    });
  }
});