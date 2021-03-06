/**
 * Created by Josh on 4/19/16.
 * Main Interpreter file for oblivion language
 */

var vd = require("./VariableDictionary.js");
var pr = require("./PrimObjects.js");
var asm = require("./Assembler.js");

//interpreter object class
var Interpreter = (function(){
    function Interpreter(){
        this.global = new vd.VariableDict();
        this.current = {value:null, type:"null"};
        this.mode = "Default";
    }
    Interpreter.prototype.splitcode = function(input){
        var slices = input.split(/(\[.*?\])/);
        var tokens = [];
        for(var i=0;i<slices.length;i++) {
            if(/\[.*?\]/.test(slices[i])) {
                tokens.push(slices[i]);
            }
        }
        return tokens;
    };
    Interpreter.prototype.inferType = function(argarray) {
        var newargs = [];
        for(var i=0;i<argarray.length;i++) {
            //grabs the current result value and pushes it to argument stack
            if(argarray[i] === "@c") {
                newargs.push(this.current);
            }
            else if(/^\".*\"$/.test(argarray[i])) {
                newargs.push(new pr.StringObj(argarray[i].slice(1, argarray[i].length-1)));
            }
            else if(/[0-9]|[1-9][0-9]+/.test(argarray[i])) {
                newargs.push(new pr.NumberObj(parseInt(argarray[i])));
            }
            else if(/^\$[a-zA-Z]+/.test(argarray[i])) {
                newargs.push(new pr.Name(argarray[i]));
            }
            else if(/^\*[a-zA-Z]+/.test(argarray[i])) {
                if(this.global.check(argarray[i].slice(1, argarray[i].length))) {
                    newargs.push(this.global.get(argarray[i].slice(1, argarray[i].length)));
                }
                else {
                    newargs.push(new pr.ErrorObj("ValueError"));
                }
            }
            else {
                newargs.push(new pr.Name(argarray[i]));
            }
        }
        return newargs;
    };
    //the interpreter works by processing a single unit at a time, rather than lines of code
    Interpreter.prototype.processUnit = function(input) {
        var pieces = input.slice(1, input.length-1).split(/(".*?")| /);
        var args = [];
        for(var a=0;a<pieces.length;a++) {
            if(pieces[a]) args.push(pieces[a]);
        }
        var calltype = args.shift();
        var typedargs = this.inferType(args);
        if(calltype in asm.StdAssembler) asm.StdAssembler[calltype](this, typedargs);
        else {
            this.current = new pr.ErrorObj("Oper Error, Unknown Oper: " + calltype);
        }
    };
    Interpreter.prototype.processCode = function(code) {
        var units = this.splitcode(code);
        for(var i=0;i<units.length;i++) {
            this.processUnit(units[i]);
        }
        console.log(this.current);
        return this.current.display();
    };
    //this method is used to process multiple units at a time, or documents of code.
    return Interpreter;
})();

exports.Interpreter = Interpreter;

