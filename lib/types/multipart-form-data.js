'use strict';

var MimeType = require('../mime-type'),
    Errors = require('../errors'),
    Promise = require('bluebird'),
    formidable = require('formidable');

module.exports = MimeType.extend('MultipartFormData', {
  qualified: {
    value: 'multipart/form-data'
  },
  simplified: {
    value: 'urlencoded'
  },
  parse: function (req) {
    var form = new formidable.IncomingForm();
    return new Promise(function (resolve, reject) {
      form.parse(req, function (err, fields, files) {
        if (err) {
          reject(err);
        }
        else {
          resolve([fields, files]);
        }
      });
    });
  }
});