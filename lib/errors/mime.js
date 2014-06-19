"use strict";
/**
 * A custom error class
 */
function MimeError () {
  this.init.apply(this, arguments);
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
}
/**
 * Extend the native error class.
 * @type {Object}
 */
MimeError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: MimeError
  }
});

/**
 * The name of the error.
 * @type {String}
 */
MimeError.prototype.name = 'MimeError';

/**
 * Initializes the error, child classes can override this.
 * @param  {String} message the error message
 */
MimeError.prototype.init = function (message) {
  this.message = message;
};

/**
 * Inherit from the custom error class.
 * @param  {Function} init The init function, should have a name.
 * @return {Function}      The descendant error class.
 */
MimeError.inherit = function (init) {
  var parent = this;
  var child = function () { return parent.apply(this, arguments); };
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child
    }
  });

  child.prototype.init = init;
  child.prototype.name = init.name;
  child.inherit = parent.inherit;

  return child;
};

module.exports = MimeError;