"use strict";

var MimeError = require('./mime');

module.exports = MimeError.inherit(function FormatError (message) {
  this.name = 'FormatError';
  this.message = message;
});
