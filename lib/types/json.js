'use strict';

var MimeType = require('../mime-type'),
    Errors = require('../errors'),
    Promise = require('bluebird');

module.exports = MimeType.extend('JSON', {
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
    return new Promise(function (resolve, reject) {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        try {
          resolve(JSON.parse(body));
        }
        catch (e) {
          reject(e);
        }
      });
    });
  }
});