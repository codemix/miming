var should = require('should'),
    expect = require('expect.js'),
    LIB = require('../lib'),
    http = require('http'),
    MockRequest = require('./mock/request'),
    querystring = require('querystring');

describe('Miming', function () {
  var instance, req;

  describe('Collection', function () {
    beforeEach(function () {
      instance = new LIB.Collection({
        items: [
          new LIB.Types.JSON(),
          new LIB.Types.FormURLEncoded(),
          new LIB.Types.HTML()
        ]
      });
    });
    describe('add()', function () {
      it('should add a type based on its name', function () {
        instance.add('JSONLD');
        instance.items.length.should.equal(4);
        instance.items.forEach(function (item) {
          item.should.be.an.instanceOf(LIB.MimeType);
        });
      });
      it('should add a type from its constructor', function () {
        instance.add(LIB.Types.JSONLD);
        instance.items.length.should.equal(4);
        instance.items.forEach(function (item) {
          item.should.be.an.instanceOf(LIB.MimeType);
        });
      });
      it('should add a type from an instance', function () {
        instance.add(new LIB.Types.JSONLD());
        instance.items.length.should.equal(4);
        instance.items.forEach(function (item) {
          item.should.be.an.instanceOf(LIB.MimeType);
        });
      });
    });
    describe('detect()', function () {
      it('should detect fully qualified mime types', function () {
        instance.detect('application/json').qualified.should.equal('application/json');
        instance.detect('application/x-www-form-urlencoded').qualified.should.equal('application/x-www-form-urlencoded');
        instance.detect('text/html').qualified.should.equal('text/html');
      });
      it('should detect simplified mime types', function () {
        instance.detect('json').qualified.should.equal('application/json');
        instance.detect('form-urlencoded').qualified.should.equal('application/x-www-form-urlencoded');
        instance.detect('html').qualified.should.equal('text/html');
      });
      it('should detect mime types based on file extensions', function () {
        instance.detect('*/*', '.json').qualified.should.equal('application/json');
        instance.detect('*/*', '.html').qualified.should.equal('text/html');
        instance.detect('*/*', '.htm').qualified.should.equal('text/html');
      });

      it('should return false for unsupported fully qualified mime types', function () {
        instance.detect('nope/nope').should.be.false;
      });
      it('should return false for unsupported simplifed mime types', function () {
        instance.detect('nope').should.be.false;
      });
      it('should return false for unsupported file extensions', function () {
        instance.detect('nope/nope', '.nope').should.be.false;
      });
    });
  });

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
    it('should format a JSON response', function () {
      var input = {greeting: 'Hello World'};
      JSON.parse(instance.format(input)).should.eql(input);
    });
  });
  describe('Types.FormURLEncoded', function () {
    beforeEach(function () {
      instance = new LIB.Types.FormURLEncoded();
      req = new MockRequest();
    });
    it('should parse a FormURLEncoded request', function () {
      var input = {greeting: 'Hello World'};
      req.mock(querystring.stringify(input));
      return instance.parse(req)
      .then(function (data) {
        data.should.eql(input);
      });
    });
    it('should format a FormURLEncoded response', function () {
      var input = {greeting: 'Hello World'};
      querystring.parse(instance.format(input)).should.eql(input);
    });
  });
});