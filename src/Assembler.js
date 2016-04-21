/**
 * Created by Josh on 4/19/16.
 */
//assembler containing file
var prim = require("./PrimObjects.js");

var StdAssembler = {
    //does not create a new object, simply effects the last object
    "+=":function(obj, args) {
        var total = args.shift();
        for(var key in args) total.value += args[key].value;
        obj.current = total;
    },
    "+":function(obj, args) {
        var total = new prim.NumberObj(0);
        for(var key in args) total.value += args[key].value;
        obj.current = total;
    },
    "-":function(obj, args) {
        var total = new prim.NumberObj(0);
        for(var key in args) total.value -= args[key].value;
        obj.current = total;
    },
    "*":function(obj, args) {
        var total = new prim.NumberObj(0);
        for(var key in args) total.value *= args[key].value;
        obj.current = total;
    }
};

exports.StdAssembler = StdAssembler;