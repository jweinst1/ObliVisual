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
                if(args[2].type === "number") {
                    for(var i=0;i<args[2].value;i++) {
                        args[0].value += args[1].value
                    }
                }
                else if(args[2].type === "list") {
                    for(var i=0;i<args[2].value.length;i++) {
                        args[0].value += args[1].value
                    }
                }
            }
            else {
                args[0].value += args[1].value;
            }
        }
        else if(args[0].type === "string" && args[1].type === "string") {
            if(args[2]) {
                if(args[2].type === "number") {
                    for(var i=0;i<args[2].value;i++) {
                        args[0].value = args[0].value.concat(args[1].value);
                    }
                }
                else if(args[2].type === "list") {
                    for(var i=0;i<args[2].value.length;i++) {
                        args[0].value = args[0].value.concat(args[1].value);
                    }
                }
            }
            else {
                args[0].value = args[0].value.concat(args[1].value);
            }
        }
        obj.current = args[0];
    },
    "+":function(obj, args) {
        if(args[0].type === "number" && args[1].type === "number") {
            var newnum = new prim.NumberObj(args[0].value);
            if(args[2]) {
                if(args[2].type === "number") {
                    for(var i=0;i<args[2].value;i++) {
                        newnum.value += args[1].value
                        obj.current = newnum;
                    }
                }
                else if(args[2].type === "list") {
                    for(var i=0;i<args[2].value.length;i++) {
                        newnum.value += args[1].value
                        obj.current = newnum;
                    }
                }
            }
            else {
               newnum.value += args[1].value;
                obj.current = newnum;
            }
        }
        else if(args[0].type === "string" && args[1].type === "string") {
            var newstr = new prim.StringObj(args[0].value.join(""));
            if(args[2]) {
                if(args[2].type === "number") {
                    for(var i=0;i<args[2].value;i++) {
                        newstr.value = newstr.value.concat(args[1].value);
                    }
                    obj.current = newstr;
                }
                else if(args[2].type === "list") {
                    for(var i=0;i<args[2].value.length;i++) {
                        newstr.value = newstr.value.concat(args[1].value);
                    }
                    obj.current = newstr;
                }
            }
            else {
                newstr.value = newstr.value.concat(args[1].value);
                obj.current = newstr;
            }
        }
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