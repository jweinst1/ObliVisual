#!/usr/bin/env node

var http = require('http');

http.createServer(function (req, res) {
    var html = buildHtml(req);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': html.length,
        'Expires': new Date().toUTCString()
    });
    res.end(html);
}).listen(8080);

function buildHtml(req) {
    var header = '';
    var body = '<canvas id="mycanvas" width="400" height="400" style="border:1px solid #c3c3c3;">Your browser does not support the HTML5 canvas tag. </canvas>';

    // concatenate header string
    // concatenate body string

    return '<!DOCTYPE html>'
        + '<html><header>' + header + '</header><body>' + body + '</body></html>';
}

console.log(buildHtml());