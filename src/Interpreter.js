/**
 * Created by Josh on 4/19/16.
 * Main Interpreter file for oblivion language
 */

var vd = require("./VariableDictionary.js");


//interpreter object class
var Interpreter = (function(){
    function Interpreter(){
        this.global = new vd.VariableDict();
        this.current = null;
    }
    return Interpreter;
})();
