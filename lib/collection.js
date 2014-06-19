'use strict';
var Classing = require('classing'),
    Types = require('./types');


module.exports = Classing.create('MimeTypeCollection', {
  items: {
    default: function () {
      return [];
    }
  },
  initialize: function () {
    this.recompile();
  },
  add: function (item) {
    if (typeof item === 'string') {
      item = new Types[item];
    }
    else if (typeof item === 'function') {
      item = new item(); // jshint ignore: line
    }
    this.items.push(item);
    this.recompile();
    return this;
  },
  detect: function (value, extension) {
    return false;
  },
  recompile: function () {
    var head = '',
        tail = '',
        exts = '';

    head += 'if (Array.isArray(value)) {\n';
    head += '  var total = value.length,\n';
    head += '      result, i;\n';
    head += '  for (i = 0; i < total; i++) {\n';
    head += '    if ((result = this.detect(value[i]))) {\n';
    head += '      return result;\n';
    head += '    }\n';
    head += '  }\n';
    head += '  return false;\n';
    head += '}\n';

    this.items.forEach(function (item, i) {
      if (item.qualified) {
        head += 'if (value === "' + item.qualified + '") {\n';
        head += '  return this.items[' + i + '];\n';
        head += '}\n';
      }
      if (item.simplified) {
        tail += 'if (~value.indexOf("' + item.simplified + '")) {\n';
        tail += '  return this.items[' + i + '];\n';
        tail += '}\n';
      }
      if (item.extensions && item.extensions.length) {
        item.extensions.forEach(function (ext) {
          exts += 'if (extension === "' + ext + '") {\n';
          exts += '  return this.items[' + i + '];\n';
          exts += '}\n';
        });
      }
    });
    var body = head + '\n' + tail + '\n' + exts + '\nreturn false;\n';
    this.detect = new Function('value', 'extension', body); // jshint ignore: line
  }
});