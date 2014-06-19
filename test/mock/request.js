var Classing = require('classing'),
    EventEmitter = require('events').EventEmitter;

module.exports = Classing.create('MockRequest', {
  headers: {
    default: function () {
      return {
        'Content-Type': 'application/json'
      };
    }
  },
  initialize: function () {
    EventEmitter.call(this);
  },
  mock: function (data) {
    var firstChunk = data.slice(0, Math.floor(data.length / 2));
    var secondChunk = data.slice(firstChunk.length);
    var self = this;
    process.nextTick(function () {
      self.emit('data', firstChunk);
      process.nextTick(function () {
        self.emit('data', secondChunk);
        process.nextTick(function () {
          self.emit('end');
        });
      });
    });
  }
});

module.exports.inherits(EventEmitter);