var http = require('http');

var ipsum = require('./ipsum.js');

var server = http.createServer(function (request, response) {
    ipsum.knedlikIpsum(function(ipsumResult) {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(ipsumResult));
    });
});

server.listen(5000);