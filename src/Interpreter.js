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
                return "Invalid Statement"
            }
        }
        console.log(arguments);
        //need processing
        var linetype = ut.GetSingleKey(current);
        switch(linetype) {
            case "[print]":
                return arguments[0];
                break;
            case "[addition]":
                return asm.MathAssembler.add(arguments);
                break;
            case "[squareop]":
                return asm.MathFuncs.square(arguments);
                break;
            case "[powerop]":
                return asm.MathFuncs.power(arguments);
                break;
            case "[subtraction]":
                return asm.MathAssembler.subtract(arguments);
                break;
            case "[multiplication]":
                return asm.MathAssembler.multiply(arguments);
                break;
            case "[division]":
                return asm.MathAssembler.divide(arguments);
                break;
            case "[equalop]":
                return asm.BoolAseembler.equals(arguments);
                break;
            case "[greaterthan]":
                return asm.BoolAseembler.gt(arguments);
                break;
            default:
                console.log("Statement Type not picked")
        }
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;


