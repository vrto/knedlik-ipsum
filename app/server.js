var http = require('http');
var url = require('url');

var ipsum = require('./ipsum.js').knedlikIpsum;

var server = http.createServer(function(request, response) {
    var defaultCount = 4;
    var defaultLength = 20;
    var queryData = url.parse(request.url, true).query;

    var ipsumRequest = {
        count: queryData.paragraphCount ? queryData.paragraphCount : defaultCount,
        length: queryData.paragraphLength ? queryData.paragraphLength : defaultLength,
        done: function(ipsumResult) {
            response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
            response.end(JSON.stringify(ipsumResult));
        }
    };

    ipsum.generate(ipsumRequest);
});

var port = process.env.PORT || 5000;
server.listen(port);

exports.closeServer = function(){
    server.close();
};