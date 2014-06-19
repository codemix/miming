'use strict';

var MimeType = require('../mime-type'),
    Errors = require('../errors'),
    Promise = require('bluebird'),
    querystring = require('querystring');

module.exports = MimeType.extend('FormURLEncoded', {
  qualified: {
    value: 'application/x-www-form-urlencoded'
  },
  simplified: {
    value: 'urlencoded'
  },
  format: function (input) {
    return querystring.stringify(input);
  },
  parse: function (req) {
    return new Promise(function (resolve, reject) {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        resolve([querystring.parse(body)]);
      });
    });
  }
});