var cmds = require("./commands/commands.json");
var asm = require("./Assembler.js");
var argcon = require("./argumentcontainers.js");
var ti = require("./TypeInference.js");
//main interpreter object
var Interpreter = (function () {
    function Interpreter() {
    }

    Interpreter.interpretLine = function (line) {
        var tokens = line.split(" ");
        var arguments = [];
        var current = cmds;
        console.log(current);
        while (tokens.length>0) {
            var temp = tokens.shift();
            if (temp in current) {
                current = current[temp];
                console.log(current)
            }
            else if ("**arg**" in current) {
                arguments.push(ti.ParseType(temp));
                current = current["**arg**"];
                console.log(current)
            }
            else {
                //breaks loop if non-formed statement encountered
                return "Invalid Token or Statement"
            }
        }
        var extracted = new argcon.ArgArray(arguments, Object.keys(current)[0]);
    };
    return Interpreter;
})();


var test = "add 6 and 7";
console.log(Interpreter.interpretLine(test));