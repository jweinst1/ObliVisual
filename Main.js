#!/usr/bin/env node
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('obl> ');
rl.prompt();
//prompt for testing new statements into the main hub of interpreter
rl.on('line', function(line) {
    var words = line.trim().split(" ");
    switch(words[0]) {
        case 'close':
            process.exit(0);
        default:
            console.log("Unknown initial command");
            break;
    }
    rl.prompt();
});