"use strict";

var MimeError = require('./mime');

module.exports = MimeError.inherit(function ParseError (message) {
  this.name = 'ParseError';
  this.message = message;
});
