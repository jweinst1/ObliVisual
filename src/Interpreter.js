var asm = require("./Assembler.js");
var argcon = require("./argumentcontainers.js");
var ti = require("./TypeInference.js");
var dict = require("./VariableDictionary.js");
var chk = require("./ErrorChecker.js");
//main interpreter object


var Interpreter = (function () {
    function Interpreter() {
        this.globals = new dict.VariableDict();
    }

    Interpreter.prototype.interpretLine = function (line) {
        var tokens = Tokenize(line);
        var arguments = [];
        for(var i=tokens.length-1;i>=0;i-=1) {
            if(tokens[i] in asm.stdAssembler) {
                asm.stdAssembler[tokens[i]](arguments, this.globals);
            }
            else {
                arguments.unshift(ti.ParseType(tokens[i], this.globals));
            }
        }
        console.log(arguments[0]);
        if(arguments[0] === undefined) return "Syntax Error";
        return arguments[0].repr();
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;

//used for properly keeping spaces inside strings
var Tokenize = function(line) {
    var tokens = line.split(/(\".*?\")| /);
    clean(tokens, undefined);
    clean(tokens, "");
    return tokens;
};

var clean = function(arr, deleteValue) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == deleteValue) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
};