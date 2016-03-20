#!/usr/bin/env node
var intp = require("./src/Interpreter.js");
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('obl> ');
rl.prompt();
//prompt for testing new statements into the main hub of interpreter
rl.on('line', function(line) {
    switch(line) {
        case 'close':
            process.exit(0);
        default:
            intp.Interpreter.interpretLine(line);
            break;
    }
    rl.prompt();
});