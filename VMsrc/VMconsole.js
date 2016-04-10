#!/usr/bin/env node
var vm = require("./VM.js");
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

var oblivion = new vm.Oblivion();

rl.setPrompt('obl> ');
rl.prompt();
//prompt for testing new statements into the main hub of interpreter
rl.on('line', function(line) {
    switch(line) {
        case 'close':
            process.exit(0);
            break;
        default:
            console.log(oblivion.process(line));
            break;
    }
    rl.prompt();
});
