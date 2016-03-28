var asm = require("./Assembler.js");
var argcon = require("./argumentcontainers.js");
var ti = require("./TypeInference.js");
var ut = require("./Utils.js");
var dict = require("./VariableDictionary.js");
var chk = require("./ErrorChecker.js");
//main interpreter object


var Interpreter = (function () {
    function Interpreter() {
        this.globals = new dict.VariableDict();
    }

    Interpreter.prototype.interpretLine = function (line) {
        var tokens = line.split(" ");
        var arguments = [];
        for(var i=tokens.length-1;i>=0;i-=1) {
            if(tokens[i] in asm.stdAssembler) {
                asm.stdAssembler[tokens[i]](arguments);
            }
            else {
                arguments.unshift(ti.ParseType(tokens[i], this.globals));
            }
        }
        console.log(arguments[0]);
        return arguments[0].repr();
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;


