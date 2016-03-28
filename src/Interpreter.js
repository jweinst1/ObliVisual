var cmds = require("./commands/commands.json");
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
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;


