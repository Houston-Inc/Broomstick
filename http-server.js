var stat = require('node-static'),
    fileServer = new stat.Server('./application'),
    http = require('http'),
    httpProxy = require('http-proxy');


httpProxy.createServer(function (req, res, proxy) {
    if(req.url.indexOf('/rest') !== -1 || req.url.indexOf('spring') !== -1 || req.url == '/user') {
        console.log('proxy to: 127.0.0.1:8089', req.url);
        proxy.proxyRequest(req, res, {
            host: '127.0.0.1',
            port: 8089
        });
    } else {
        console.log('proxy to: 127.0.0.1:8088', req.url);
        proxy.proxyRequest(req, res, {
            host: '127.0.0.1',
            port: 8088
        });
    }
}).listen(8080);

http.createServer(function (request, response) {
    if(request.method === 'GET') {
        request.addListener('end', function () {
            fileServer.serve(request, response, function (e, res) {
                if (e && (e.status === 404)) { // If the file wasn't found
                    fileServer.serveFile('/index.html', 200, {}, request, response);
                }
            });
        });
    }
    request.resume();
}).listen(8088);

var testFileServer = new stat.Server('./');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        testFileServer.serve(request, response);
    });
    request.resume();
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
    request.resume();
}).listen(8090);

var testBuild = new stat.Server('./test-build');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        testBuild.serve(request, response);
    });
    request.resume();
}).listen(7358);
