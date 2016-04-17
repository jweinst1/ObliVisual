#!/usr/bin/env node

var fs = require('fs');
var userArgs = process.argv.slice(2);
var cmpl = require("./src/Compiler.js");
/**
 * Mainfile to faciliate reading and writing html docs.
 */

fs.readFile(userArgs[0], 'utf-8', function (err, data) {
    if (err) throw err;
    /*data = data.split("\n");*/
    var readstring = cmpl.Compile.compileToHTML(data);
    fs.writeFile(userArgs[1], readstring, function (err) {
        if (err) throw err;
        console.log('Your file has been transcompiled to HTMl');
    });
});
