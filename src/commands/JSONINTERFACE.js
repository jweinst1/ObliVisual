#!/usr/bin/env node
var cmds = require('./commands.json');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('cmds> ');
rl.prompt();
//prompt for testing new statements into the json hub of the interpreter
rl.on('line', function(line) {
    var words = line.trim().split(" ");
    switch(words[0]) {
        case 'get':
            console.log(cmds[words[1]]);
            break;
        case 'close':
            process.exit(0);
        default:
            console.log("Unknown initial command");
            break;
    }
    rl.prompt();
});
