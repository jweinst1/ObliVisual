#!/usr/bin/env node
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
var itp = require("./src/Interpreter.js");

rl.setPrompt('TTT> ');
rl.prompt();

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        case 'close':
            process.exit(0);
        default:
            console.log('Say what? I might have heard `' + line.trim() + '`');
            break;
    }
    rl.prompt();
});
