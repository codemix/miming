# Miming

A very small library for parsing and formatting various different mime types in node.js.

> Note: Miming does not deal with content negotiation, you should use another library such as [negotiator](https://www.npmjs.org/package/negotiator) for that.

Miming supports the following built in mime types:

- [`application/json`](./lib/types/json.js)
- [`application/ld+json`](./lib/types/jsonld.js)
- [`text/html`](./lib/types/html.js)
- [`application/xhtml+xml`](./lib/types/xhtml.js)
- [`multipart/form-data`](./lib/types/multipart-form-data.js)
- [`application/x-www-form-urlencoded`](./lib/types/form-urlencoded.js)

## Installation

Via [npm](https://npmjs.org/package/miming):

```
npm install miming
```


## Usage


### Creating a collection

Create a [Collection](./lib/collection.js) of [MimeTypes](./lib/mime-type.js) that you'd like to handle in your
application. Specify the types in order of precedence.

```js
var Miming = require('miming');

var collection = new Miming.Collection([
  'HTML',
  'JSON',
  'FormURLEncoded',
  'MultipartFormData'
]);

var mime = collection.get('application/json');
mime.should.be.an.instanceOf(Miming.Types.JSON);

console.log(mime.format({foo: 'bar'})).should.equal('{"foo":"bar"}');

```

###  Adding a type to a collection

```js
collection.add('JSONLD');
// or
collection.add('application/json');
// or
collection.add(new Miming.Types.JSONLD());
// or
collection.add(Miming.Types.JSONLD);
```

### Processing requests

Here's a tiny application which parses requests in various formats, translates them
to JSON, and echos them back to the client.

```js
var http = require('http'),
    Negotiator = require('negotiator'),
    Miming = require('../lib'),
    collection = new Miming.Collection();

collection.add('application/json');
collection.add('application/x-www-form-urlencoded');
collection.add('multipart/form-data');


http.createServer(function (req, res) {
  if (!req.headers['content-type']) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<form method="POST"><textarea name="content"></textarea><br><button type="submit">Go</button></form>');
    return;
  }
  collection.parse(req)
  .spread(function (body, files) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    return collection.format('application/json', {
      body: body,
      files: files
    })
    .then(res.end.bind(res));
  })
  .done();
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

## License

MIT, see [LICENSE.md](./LICENSE.md).