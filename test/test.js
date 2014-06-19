var should = require('should'),
    expect = require('expect.js'),
    LIB = require('../lib'),
    MockRequest = require('./mock/request');

describe('Miming', function () {
  var instance, req;
  describe('Types.JSON', function () {
    beforeEach(function () {
      instance = new LIB.Types.JSON();
      req = new MockRequest();
    });
    it('should parse a JSON request', function () {
      var input = {greeting: 'Hello World'};
      req.mock(JSON.stringify(input));
      return instance.parse(req)
      .then(function (data) {
        data.should.eql(input);
      });
    });
  });
});