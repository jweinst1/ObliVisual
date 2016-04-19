#!/usr/bin/env node
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
var itp = require("./src/Interpreter.js");
var interpret = new itp.Interpreter();

rl.setPrompt('obl> ');
rl.prompt();

rl.on('line', function(line) {
    switch(line) {
        case 'close':
            process.exit(0);
        default:
            console.log(interpret.processUnit(line));
            break;
    }
    rl.prompt();
});
