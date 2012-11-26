var stat = require('node-static'),
    fileServer = new stat.Server('./application'),
    http = require('http'),
    httpProxy = require('http-proxy');


httpProxy.createServer(function (req, res, proxy) {
    proxy.proxyRequest(req, res, {
        host: '127.0.0.1',
        port: 8088
    });
}).listen(8080);

http.createServer(function (request, response) {
    if(request.method === "GET") {
        request.addListener('end', function () {
            fileServer.serve(request, response, function (e, res) {
                if(request.url.indexOf('/error/401') !== -1) {
                    response.writeHead(401);
                    response.end();
                } else if (request.url.indexOf('/error/500') !== -1) {
                    response.writeHead(500);
                    response.end();
                } else if (e && (e.status === 404)) { // If the file wasn't found
                    fileServer.serveFile('/index.html', 200, {}, request, response);
                }
            });
        });
    }

}).listen(8088);

var testFileServer = new stat.Server('./');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        testFileServer.serve(request, response);
    });
}).listen(7357);


var release = new stat.Server('./release');

require('http').createServer(function (request, response) {

    if(request.method === "GET") {
        request.addListener('end', function () {
            release.serve(request, response, function (e, res) {
                if (e && (e.status === 404)) { // If the file wasn't found
                    release.serveFile('/index.html', 200, {}, request, response);
                }
            });
        });
    }

}).listen(8090);

var testBuild = new stat.Server('./test-build');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        testBuild.serve(request, response);
    });
}).listen(7358);
