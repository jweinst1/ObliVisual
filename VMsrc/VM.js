var vd = require("./VariableDictionary.js");

//main VM class
var Oblivion = (function(){
    function Oblivion() {
        this.current = null;
        this.assembler = Assembler;
        this.vars = new vd.VariableDict();
    }
    //functions stored in object for quick access
    //all must be calld with an instance of the VM, Oblivion
    var Assembler = {
        "=":function(args, obj) {
            obj.vars.set(args[0], args[1]);
        },
        "++":function(args, obj) {
            obj.current++;
        },
        "--":function(args, obj) {
            obj.current--;
        },
        "+":function(args, obj) {
            for(var key in args) obj.current += args[key];
        },
        "-":function(args, obj) {
            for(var key in args) obj.current -= args[key];
        },
        "*":function(args, obj) {
            for(var key in args) obj.current *= args[key];
        },
        "/":function(args, obj) {
            for(var key in args) obj.current /= args[key];
        },
        //floor division
        "//":function(args, obj) {
            for(var key in args) obj.current = Math.floor(obj.current / args[key]);
        },
        "**":function(args, obj) {
            for(var key in args) obj.current = Math.pow(obj.current, args[key]);
        },
        "%":function(args, obj) {
            for(var key in args) obj.current %= args[key];
        },
        "@":function(args, obj) {
            obj.current = args[0];
        },
        "==":function(args, obj) {
            for(var key in args) {
                if(!(args[key] === obj.current)) {
                    obj.current = false;
                    return;
                }
            }
            obj.current = true;
        },
        "<":function(args, obj) {
            for(var key in args) {
                if(!(args[key] > obj.current)) {
                    obj.current = false;
                    return;
                }
            }
            obj.current = true;
        },
        ">":function(args, obj) {
            for(var key in args) {
                if(!(args[key] < obj.current)) {
                    obj.current = false;
                    return;
                }
            }
            obj.current = true;
        },
        ">=":function(args, obj) {
            for(var key in args) {
                if(!(args[key] >= obj.current)) {
                    obj.current = false;
                    return;
                }
            }
            obj.current = true;
        },
        "<=":function(args, obj) {
            for(var key in args) {
                if(!(args[key] <= obj.current)) {
                    obj.current = false;
                    return;
                }
            }
            obj.current = true;
        },
        "!=":function(args, obj) {
            for(var key in args) {
                if(!(args[key] != obj.current)) {
                    obj.current = false;
                    return;
                }
            }
            obj.current = true;
        },
        //changes current value to number.
        "#":function(args, obj) {
            obj.current = parseInt(obj.current);
        },
        //turns current element to a string
        "`":function(args, obj) {
            obj.current = JSON.stringify(obj.current);
        },
        //appending function
        "<-":function(args, obj) {
            for(var key in args) obj.current.push(args[key]);
        },
        //removing function, removes all the elements in the array, that are in args
        "->":function(args, obj) {
            for(var key in args) obj.current.splice(obj.current.indexOf(args[key]), 1);
        },
        //logical abstract OR operator
        "|":function(args, obj) {
            for(var key in args) obj.current = obj.current || args[key];
        },
        //logical abstract AND operator
        "&":function(args, obj) {
            for(var key in args) obj.current = obj.current && args[key];
        },
        //resets current element to null
        "!!":function(args, obj) {
            obj.current = null;
        }
    };
    //main splitting function
    Oblivion.prototype.splitfunc = function(string) {
        if(/;.+;/.test(string)) {
            var tokens = string.slice(1, string.length-1).split(";");
            for(var i=0;i<tokens.length;i++) {
                tokens[i] = tokens[i].split(":");
            }
            return tokens;
        }
        else {
            //returns false if string is invalid assembly language
            return false;

        }
    };
    Oblivion.prototype.typeinfer = function(tokens) {
        for(var i=0;i<tokens.length;i++) {
            if(/([0-9]+)\.\.([0-9]+)/.test(tokens[i])) {
                var matched = /([0-9]+)\.\.([0-9]+)/.exec(tokens[i]);
                var start = parseInt(matched[1]);
                var end = parseInt(matched[2]);
                var newlst = [];
                for(var j=start;j<end;j++) {
                    newlst.push(j);
                }
                tokens[i] = newlst;
            }
            else if(/[0-9]|[1-9][0-9]+/.test(tokens[i])) {
                tokens[i] = parseInt(tokens[i]);
            }
            else if(/".*?"/.test(tokens[i])) {
                tokens[i] = tokens[i].slice(1, tokens[i].length-1);
            }
            //variable binding
            else if(/^\$.+$/.test(tokens[i])) {
                tokens[i] = tokens[i];
            }
            //uses the *name format for getting a bound variable.
            else if(/^\*.+$/.test(tokens[i])) {
                tokens[i] = this.vars.get("$" + tokens[i].slice(1,tokens[i].length));
            }
            //puts empty array into arg slice
            else if(tokens[i] === "[]") {
                tokens[i] = [];
            }
            else if(tokens[i] === "{}") {
                tokens[i] = {};
            }
            else {
                throw "Token Error, at expression: " + tokens[i];

            }
        }
    };
    Oblivion.prototype.process = function(code) {
        var pieces = this.splitfunc(code);
        for(var i=0;i<pieces.length;i++) {
            var calltype = pieces[i].shift();
            //immediate return to kill assembly
            if(calltype === "=>") {
                var result = this.current;
                this.current = null;
                return result;
            }
            //allows for conditionals
            else if(calltype === "?") {
                pieces[i].unshift(calltype);
                this.current ? i += 0 : i++;
                continue;
            }
            //logical not conditional
            else if(calltype === "!") {
                pieces[i].unshift(calltype);
                this.current ? i ++ : i+=0;
                continue;
            }
            //looping amount oper
            else if(calltype === "~") {
                this.typeinfer(pieces[i]);
                pieces[i].unshift(calltype);
                var shiftamount = pieces[i][1];
                pieces.splice(i, 1);
                i -= shiftamount;
                continue
            }
            this.typeinfer(pieces[i]);
            if(calltype in this.assembler) {
                this.assembler[calltype](pieces[i], this);
                pieces[i].unshift(calltype);
            }
            else {
                throw "Invalid Oper Error";
            }
        }
        var result = this.current;
        this.current = null;
        return result;
    };
    return Oblivion;
})();

exports.Oblivion = Oblivion;