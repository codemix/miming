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