var http = require('http');
var url = require('url');

var ipsum = require('./ipsum.js').knedlikIpsum;

var server = http.createServer(function (request, response) {
    var queryData = url.parse(request.url, true).query;

    ipsum.generate(function(ipsumResult) {
        response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
        response.end(JSON.stringify(ipsumResult));
    });
});

var port = process.env.PORT || 5000;
server.listen(port);