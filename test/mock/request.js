var Classing = require('classing'),
    Request = require('http').IncomingMessage,
    ReadableStream = require('stream').PassThrough;

module.exports = Classing.create('MockRequest', {
  initialize: function () {
    Request.call(this, new ReadableStream());
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

module.exports.inherits(Request);