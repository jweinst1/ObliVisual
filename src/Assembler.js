/**
 * Created by Josh on 4/19/16.
 */
//assembler containing file
var prim = require("./PrimObjects.js");

var StdAssembler = {
    //does not create a new object, simply effects the last object
    "print":function(obj, args) {
        if(args.length > 0) {
            obj.current = args[0];
        }
    },
    "+=": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        args[0].value += args[1].value;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        args[0].value += args[1].value;
                    }
                }
            }
            else {
                args[0].value += args[1].value;
            }
        }
        else if (args[0].type === "string" && args[1].type === "string") {
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        args[0].value = args[0].value.concat(args[1].value);
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
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
    "+": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            var newnum = new prim.NumberObj(args[0].value);
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        newnum.value += args[1].value;
                        obj.current = newnum;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        newnum.value += args[1].value;
                        obj.current = newnum;
                    }
                }
            }
            else {
                newnum.value += args[1].value;
                obj.current = newnum;
            }
        }
        else if (args[0].type === "string" && args[1].type === "string") {
            var newstr = new prim.StringObj(args[0].value.join(""));
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        newstr.value = newstr.value.concat(args[1].value);
                    }
                    obj.current = newstr;
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
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
    "-": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            var newnum = new prim.NumberObj(args[0].value);
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        newnum.value -= args[1].value;
                        obj.current = newnum;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        newnum.value -= args[1].value;
                        obj.current = newnum;
                    }
                }
            }
            else {
                newnum.value -= args[1].value;
                obj.current = newnum;
            }
        }
    },
    "-=": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        args[0].value -= args[1].value;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        args[0].value -= args[1].value;
                    }
                }
            }
            else {
                args[0].value -= args[1].value;
            }
        }
        obj.current = args[0];
    },
    "*": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            var newnum = new prim.NumberObj(args[0].value);
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        newnum.value *= args[1].value;
                        obj.current = newnum;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        newnum.value *= args[1].value;
                        obj.current = newnum;
                    }
                }
            }
            else {
                newnum.value *= args[1].value;
                obj.current = newnum;
            }
        }
    },
    "*=": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        args[0].value *= args[1].value;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        args[0].value *= args[1].value;
                    }
                }
            }
            else {
                args[0].value *= args[1].value;
            }
        }
        obj.current = args[0];
    },
    "/": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            var newnum = new prim.NumberObj(args[0].value);
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        newnum.value /= args[1].value;
                        if(!isFinite(newnum.value)) newnum.value = 0;
                        obj.current = newnum;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        newnum.value /= args[1].value;
                        if(!isFinite(newnum.value)) newnum.value = 0;
                        obj.current = newnum;
                    }
                }
            }
            else {
                newnum.value /= args[1].value;
                if(!isFinite(newnum.value)) newnum.value = 0;
                obj.current = newnum;
            }
        }
    },
    "/=": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        args[0].value /= args[1].value
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        args[0].value /= args[1].value
                    }
                }
            }
            else {
                args[0].value /= args[1].value;
            }
        }
        if(!isFinite(args[0].value)) args[0].value = 0;
        obj.current = args[0];
    },
    "%": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            var newnum = new prim.NumberObj(args[0].value);
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        newnum.value %= args[1].value;
                        obj.current = newnum;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        newnum.value %= args[1].value;
                        obj.current = newnum;
                    }
                }
            }
            else {
                newnum.value %= args[1].value;
                obj.current = newnum;
            }
        }
    },
    "%=": function (obj, args) {
        if (args[0].type === "number" && args[1].type === "number") {
            if (args[2]) {
                if (args[2].type === "number") {
                    for (var i = 0; i < args[2].value; i++) {
                        args[0].value %= args[1].value;
                    }
                }
                else if (args[2].type === "list") {
                    for (var i = 0; i < args[2].value.length; i++) {
                        args[0].value %= args[1].value;
                    }
                }
            }
            else {
                args[0].value %= args[1].value;
            }
        }
        obj.current = args[0];
    },
    "!":function(obj, args) {
        if(args[0].type === "name") {
            obj.current = new prim.Process(args[0].repr(), args[1]);
        }
    },
    "->":function(obj, args) {
        if(args[0].type === "process") {
            if(args[2] && args[2].type === "number") {
                for(var i=0;i<args[2].value;i++) {
                    args[0].call(args[1]);
                }
                obj.current = args[1];
            }
            else if(args[2] && args[2].type === "number") {
                for(var i=0;i<args[2].value.length;i++) {
                    args[0].call(args[1]);
                }
                obj.current = args[1];
            }
            else {
                args[0].call(args[1]);
                obj.current = args[1];
            }
        }
    },
    "=":function(obj, args) {
        if(args[0].type === "name" && args[1]) {
            obj.global.set(args[0].repr().slice(1, args[0].repr().length), args[1]);
            obj.current = args[1];
        }
    },
    //equals comparison operator, determines absolute equality
    "==":function(obj, args) {
        //turns false instantly if types are not the same
        if(args[0].type !== args[1].type) {
            obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "number" && args[1].type === "number") {
            args[0].value === args[1].value ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "string" && args[1].type === "string") {
            args[0].value.join("") === args[1].value.join("") ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
    },
    "!=":function(obj, args) {
        //turns true instantly if types are not the same
        if(args[0].type !== args[1].type) {
            obj.current = new prim.BoolObj(true);
        }
        else if(args[0].type === "number" && args[1].type === "number") {
            args[0].value !== args[1].value ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "string" && args[1].type === "string") {
            args[0].value.join("") !== args[1].value.join("") ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
    },
    ">":function(obj, args) {
        //turns false instantly if types are not the same
        if(args[0].type !== args[1].type) {
            obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "number" && args[1].type === "number") {
            args[0].value > args[1].value ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "string" && args[1].type === "string") {
            args[0].value.length > args[1].value.length ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "list" && args[1].type === "list") {
            args[0].value.length > args[1].value.length ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
    },
    "<":function(obj, args) {
        //turns false instantly if types are not the same
        if(args[0].type !== args[1].type) {
            obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "number" && args[1].type === "number") {
            args[0].value < args[1].value ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "string" && args[1].type === "string") {
            args[0].value.length < args[1].value.length ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
        else if(args[0].type === "list" && args[1].type === "list") {
            args[0].value.length < args[1].value.length ? obj.current = new prim.BoolObj(true): obj.current = new prim.BoolObj(false);
        }
    },
    //creates a list object
    "list":function(obj, args) {
        var newlst = new prim.ListObj();
        for(var i=0;i<args.length;i++) {
            newlst.append(args[i]);
        }
        obj.current = newlst;
    },
    "array":function(obj, args) {
        if(args[0].type === "number") {
            var newarr = new prim.ArrayObj(args[0].value);
            obj.current = newarr;
        }
    },
    //general appending operator
    "<<":function(obj, args) {
        if(args[0].type === "list") {
            args[0].append(args[1]);
            obj.current = args[0];
        }
    },
    //pop operator, works on list and strings
    ">!":function(obj, args) {
        if(args[0].type === "list") {
            var popped = args[0].pop();
            if (popped) {
                obj.current = popped;
            }
        }
        if(args[0].type === "string") {
            var popped = args[0].pop();
            if(popped) {
                obj.current = new prim.StringObj(popped);
            }
        }
    }
};
exports.StdAssembler = StdAssembler;