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
      instance = new LIB.Collection([
          new LIB.Types.JSON(),
          new LIB.Types.FormURLEncoded(),
          new LIB.Types.HTML(),
          new LIB.Types.Text()
        ]);
    });
    describe('add()', function () {
      it('should add a type based on its name', function () {
        instance.add('JSONLD');
        instance.items.length.should.equal(5);
        instance.items.forEach(function (item) {
          item.should.be.an.instanceOf(LIB.MimeType);
        });
      });
      it('should add a type from its constructor', function () {
        instance.add(LIB.Types.JSONLD);
        instance.items.length.should.equal(5);
        instance.items.forEach(function (item) {
          item.should.be.an.instanceOf(LIB.MimeType);
        });
      });
      it('should add a type from an instance', function () {
        instance.add(new LIB.Types.JSONLD());
        instance.items.length.should.equal(5);
        instance.items.forEach(function (item) {
          item.should.be.an.instanceOf(LIB.MimeType);
        });
      });
    });
    describe('get()', function () {
      it('should get fully qualified mime types', function () {
        instance.get('application/json').qualified.should.equal('application/json');
        instance.get('application/x-www-form-urlencoded').qualified.should.equal('application/x-www-form-urlencoded');
        instance.get('text/html').qualified.should.equal('text/html');
        instance.get('text/plain').qualified.should.equal('text/plain');
      });
      it('should get simplified mime types', function () {
        instance.get('json').qualified.should.equal('application/json');
        instance.get('form-urlencoded').qualified.should.equal('application/x-www-form-urlencoded');
        instance.get('html').qualified.should.equal('text/html');
        instance.get('text').qualified.should.equal('text/plain');
      });
      it('should get mime types based on file extensions', function () {
        instance.get('*/*', '.json').qualified.should.equal('application/json');
        instance.get('*/*', '.html').qualified.should.equal('text/html');
        instance.get('*/*', '.htm').qualified.should.equal('text/html');
        instance.get('*/*', '.txt').qualified.should.equal('text/plain');
      });

      it('should return false for unsupported fully qualified mime types', function () {
        instance.get('nope/nope').should.be.false;
      });
      it('should return false for unsupported simplifed mime types', function () {
        instance.get('nope').should.be.false;
      });
      it('should return false for unsupported file extensions', function () {
        instance.get('nope/nope', '.nope').should.be.false;
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
        data.should.eql([input]);
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
        data.should.eql([input]);
      });
    });
    it('should format a FormURLEncoded response', function () {
      var input = {greeting: 'Hello World'};
      querystring.parse(instance.format(input)).should.eql(input);
    });
  });
});