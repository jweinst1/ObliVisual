var cmds = require("./commands/commands.json");
var asm = require("./Assembler.js");
var argcon = require("./argumentcontainers.js");
var ti = require("./TypeInference.js");
var ut = require("./Utils.js");
//main interpreter object
var Interpreter = (function () {
    function Interpreter() {
    }

    Interpreter.interpretLine = function (line) {
        var tokens = line.split(" ");
        var arguments = [];
        var current = cmds;
        while (tokens.length>0) {
            var temp = tokens.shift();
            if (temp in current) {
                current = current[temp];
            }
            else if ("**arg**" in current) {
                arguments.push(ti.ParseType(temp));
                current = current["**arg**"];
            }
            else {
                //breaks loop if non-formed statement encountered
                return "Invalid Token or Statement"
            }
        }
        //need processing
        var linetype = ut.GetSingleKey(current);
        switch(linetype) {
            case "[addition]":
                console.log(asm.MathAssembler.add(arguments));
                break;
            default:
                console.log("Statement Type not picked")
        }
    };
    return Interpreter;
})();


var test = "add 6 and 7";
console.log(Interpreter.interpretLine(test));