/**
 * Created by Josh on 4/9/16.
 */

//main VM class
var Oblivion = (function(){
    function Oblivion() {
        this.current = null;
        this.assembler = Assembler;
    }
    //functions stored in object for quick access
    //all must be calld with an instance of the VM, Oblivion
    var Assembler = {
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
                if(!(args[key] < obj.current)) {
                    obj.current = false;
                    return;
                }
            }
            obj.current = true;
        },
        ">":function(args, obj) {
            for(var key in args) {
                if(!(args[key] > obj.current)) {
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
        //appending function
        "<-":function(args, obj) {
            for(var key in args) obj.current.push(args[key]);
        },
        //removing function, removes all the elements in the array, that are in args
        "->":function(args, obj) {
            for(var key in args) obj.current.splice(obj.current.indexOf(args[key]), 1);
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
            if(/[0-9]|[1-9][0-9]+/.test(tokens[i])) {
                tokens[i] = parseInt(tokens[i]);
            }
            else if(/".*?"/.test(tokens[i])) {
                tokens[i] = tokens[i].slice(1, tokens[i].length-1);
            }
            //puts empty array into arg slice
            else if(tokens[i] === "[]") {
                tokens[i] = [];
            }
            else {
                throw "Token Error, at expression: " + token;

            }
        }
    };
    Oblivion.prototype.process = function(code) {
        var pieces = this.splitfunc(code);
        for(var i=0;i<pieces.length;i++) {
            var calltype = pieces[i].shift();
            if(calltype === "=>") {
                var result = this.current;
                this.current = null;
                return result;
            }
            this.typeinfer(pieces[i]);
            if(calltype in this.assembler) this.assembler[calltype](pieces[i], this);
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