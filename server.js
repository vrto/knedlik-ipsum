var http = require('http');

var ipsum = require('./ipsum.js');

var server = http.createServer(function (request, response) {
    ipsum.knedlikIpsum(function(ipsumResult) {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(ipsumResult));
    });
});

var port = process.env.PORT || 5000;
server.listen(port);