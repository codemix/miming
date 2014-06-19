'use strict';

var MimeType = require('../mime-type'),
    Errors = require('../errors'),
    Promise = require('bluebird');

module.exports = MimeType.extend('Text', {
  qualified: {
    value: 'text/plain'
  },
  simplified: {
    value: 'text'
  },
  extensions: {
    default: function () {
      return ['.txt'];
    }
  },
  format: function (input) {
    return ''+input;
  },
  parse: function (req) {
    return new Promise(function (resolve, reject) {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        try {
          resolve([body]);
        }
        catch (e) {
          reject(e);
        }
      });
    });
  }
});