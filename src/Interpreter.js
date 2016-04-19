/**
 * Created by Josh on 4/19/16.
 * Main Interpreter file for oblivion language
 */

var vd = require("./VariableDictionary.js");
var pr = require("./PrimObjects.js");

//interpreter object class
var Interpreter = (function(){
    function Interpreter(){
        this.global = new vd.VariableDict();
        this.current = null;
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
    Interpreter.prototype.inferType = function(arg) {
        if(/[0-9]|[1-9][0-9]+/.test(arg)) {
            return new pr.NumberObj(parseInt(arg));
        }
        else if(/^\".*\"$/.test(arg)) {
            return new pr.StringObj(arg.slice(1, arg.length-1));
        }
    };
    //the interpreter works by processing a single unit at a time, rather than lines of code
    Interpreter.prototype.processUnit = function(input) {
        var pieces = input.slice(1, input.length-1).split(/(".*?")| /);
        var args = [];
        for(var a=0;a<pieces.length;a++) {
            if(pieces[a]) args.push(pieces[a]);
        }
        return args;
    };
    //this method is used to process multiple units at a time, or documents of code.
    Interpreter.prototype.processCode = function(code) {
        var tokens = this.splitcode(code);
        for(var i=0;i<tokens.length;i++) this.processUnit(tokens[i]);
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;

