'use strict';
exports.HTML = exports['text/html'] = require('./html');
exports.XHTML = exports['application/xhtml+xml'] = require('./xhtml');
exports.JSON = exports['application/json'] = require('./json');
exports.JSONLD = exports['application/ld+json'] = require('./jsonld');
exports.FormURLEncoded = exports['application/x-www-form-urlencoded'] = require('./form-urlencoded');
exports.MultipartFormData = exports['multipart/form-data'] = require('./multipart-form-data');
exports.Text = exports['text/plain'] = require('./text');