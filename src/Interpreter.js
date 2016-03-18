var cmds = require("./commands/commands.json");
//main interpreter object
var Interpreter = (function () {
    function Interpreter() {
    }

    Interpreter.interpretLine = function (line) {
        var tokens = line.split(" ");
        var current = cmds;
        while (tokens.length>0) {
            var temp = tokens.shift()
            if (temp in current) {
                current = current[temp]
            }
            else {
                //breaks loop if non-formed statement encountered
                return "Invalid Token or Statement"
            }
        }
    };
    return Interpreter;
})();