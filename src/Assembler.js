/**
 * Created by Josh on 4/19/16.
 */
//assembler containing file
var prim = require("./PrimObjects.js");

var StdAssembler = {
    //does not create a new object, simply effects the last object
    "+=":function(obj, args) {
        if(args[0].type === "number" && args[1].type === "number") {
            if(args[2]) {
                for(var i=0;i<args[2].value;i++) {
                    args[0].value += args[1].value
                }
            }
            else {
                args[0].value += args[1].value;
            }
        }
        else if(args[0].type === "string" && args[1].type === "string") {
            if(args[2]) {
                for(var i=0;i<args[2].value;i++) {
                    args[0].value = args[0].value.concat(args[1].value);
                }
            }
            else {
                args[0].value = args[0].value.concat(args[1].value);
            }
        }
        obj.current = args[0];
    },
    "+":function(obj, args) {
        var total = new prim.NumberObj(0);
        for(var key in args) {
            if(args[key].type === "number") {
                total.value += args[key].value;
            }
        }
        obj.current = total;
    },
    "-":function(obj, args) {
        var total = new prim.NumberObj(0);
        for(var key in args) total.value -= args[key].value;
        obj.current = total;
    },
    "*":function(obj, args) {
        var total = new prim.NumberObj(1);
        for(var key in args) total.value *= args[key].value;
        obj.current = total;
    }
};

exports.StdAssembler = StdAssembler;