/**
 * File that handles the assembly of arguments passed through the command dictionary
 */
var bip = require("./builtinobjects/BuiltInPrimitive.js");

//checks if arguments length too long or short
function checkarguments(args, num) {
    if(args.length !== num) return "arguments too long or too short";
}

    //assembles core opers and statements
var stdAssembler = {
    "+=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.add(numbers[elem]);
        }
    },
    "+":function(numbers) {
        while(numbers.length > 1) {
            numbers[0] = new bip.NumberObj(numbers[0].value + numbers[1].value);
            numbers.splice(1, 1);
        }
    },
    "&":function(args) {
        while(args.length > 1) {
            if(args[0].type === "number" && args[1].type === "number") {
                args[0] = new bip.NumberObj(parseInt(args[0].value.toString() + args[1].value.toString()));
                args.splice(1, 1);
            }
            else if(args[0].type === "string" && args[1].type === "string") {
                args[0] = new bip.StringObj(args[0].string + args[1].string);
                args.splice(1, 1);
            }
        }
    },
    "^":function(args) {
        while(args.length > 1) {
            if(args[0].type === "number" && args[1].type === "number") {
                args[0] = new bip.NumberObj(Math.max(args[0].value, args[1].value));
                args.splice(1, 1);
            }
        }
    },
    "_":function(args) {
        while(args.length > 1) {
            if(args[0].type === "number" && args[1].type === "number") {
                args[0] = new bip.NumberObj(Math.min(args[0].value, args[1].value));
                args.splice(1, 1);
            }
        }
    },
    "-":function(numbers) {
        while(numbers.length > 1) {
            numbers[0] = new bip.NumberObj(numbers[0].value - numbers[1].value);
            numbers.splice(1, 1);
        }
    },
    "*":function(numbers) {
        while(numbers.length > 1) {
            numbers[0] = new bip.NumberObj(numbers[0].value * numbers[1].value);
            numbers.splice(1, 1);
        }
    },
    "/":function(numbers) {
        while(numbers.length > 1) {
            if (numbers[1]===0) {
                numbers.splice(1, 1);
            }
            else {
                numbers[0] = new bip.NumberObj(numbers[0].value - numbers[1].value);
                numbers.splice(1, 1);
            }
        }
    },
    "%":function(numbers) {
        while(numbers.length > 1) {
            numbers[0] = new bip.NumberObj(numbers[0].value % numbers[1].value);
            numbers.splice(1, 1);
        }
    },
    "-=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.subtract(numbers[elem]);
        }
    },
    "*=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.multiply(numbers[elem]);
        }
    },
    "/=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.divide(numbers[elem]);
        }
    },
    "%=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.remainder(numbers[elem]);
        }
    },
    "==":function(args) {
        var first = args.shift();
        var is = true;
        for(var key in args) {
            if(first.repr() !== args[key].repr()) {
                //needs fixing for bool object
                is = false;
                break;
            }
        }
        is ? args.unshift(new bip.BoolObj(true)):args.unshift(new bip.BoolObj(false));
    },
    "!=":function(args) {
        var first = args.shift();
        var is = true;
        for(var key in args) {
            if(first.repr() === args[key].repr()) {
                //needs fixing for bool object
                is = false;
                break;
            }
        }
        is ? args.unshift(new bip.BoolObj(true)):args.unshift(new bip.BoolObj(false));
    },
    //compares the element at the top of the stack with all the other elements one by one
    ">":function(args) {
        var is = true;
        var first = args.shift();
        for(var key in args) {
            if(!(first.repr() > args[key].repr())) {
                //needs fixing for bool object
                is = false;
                break;
            }
        }
        is ? args.unshift(new bip.BoolObj(true)):args.unshift(new bip.BoolObj(false));
    },
    //compares the element at the top of the stack with all the other elements one by one
    "<":function(args) {
        var is = true;
        var first = args.shift();
        for(var key in args) {
            if(!(first.repr() < args[key].repr())) {
                //needs fixing for bool object
                is = false;
                break;
            }
        }
        is ? args.unshift(new bip.BoolObj(true)):args.unshift(new bip.BoolObj(false));
    },
    "<=":function(args) {
        var is = true;
        var first = args.shift();
        for(var key in args) {
            if(!(first.repr() <= args[key].repr())) {
                //needs fixing for bool object
                is = false;
                break;
            }
        }
        is ? args.unshift(new bip.BoolObj(true)):args.unshift(new bip.BoolObj(false));
    },
    ">=":function(args) {
        var is = true;
        var first = args.shift();
        for(var key in args) {
            if(!(first.repr() >= args[key].repr())) {
                //needs fixing for bool object
                is = false;
                break;
            }
        }
        is ? args.unshift(new bip.BoolObj(true)):args.unshift(new bip.BoolObj(false));
    },
    "list":function(args) {
        //holds the objects for list generation
        var newlist = new bip.ListObj();
        while(args.length > 0) {
            newlist.append(args[0]);
            args.splice(0, 1)
        }
        args.unshift(newlist);
    },
    //appending or adding oper
    "<<":function(args) {
        var container = args.shift();
        while(args.length > 0) {
            if(container.type === "list") {
                container.append(args[0]);
                args.splice(0, 1);
            }
        }
        args.unshift(container);
    }


};

exports.stdAssembler = stdAssembler;

//static functions that deal with boolean comparisons

var BoolAssembler = {
    equals:function(elements) {
        checkarguments(elements, 2);
        return elements[0].value === elements[1].value
    },
    notequal:function(elements) {
        checkarguments(elements, 2);
        return elements [0].value !== elements[1].value
    },
    gt:function(elements) {
        checkarguments(elements, 2);
        return elements[0].value > elements[1].value
    },
    lt:function(elements) {
        return elements[0].value < elements[1].value
    },
    ge:function(elements) {
        return elements[0].value >= elements[1].value
    },
    le:function(elements) {
        return elements[0].value <= elements[1].value
    }
};

//exports the bool assembler
exports.BoolAseembler = BoolAssembler;

//specialized math functions
var MathFuncs = {
    power:function(numbers) {
        numbers[0].power(numbers[1]);
        return numbers[0].repr()
    },
    random:function(numbers) {
        return Math.floor((Math.random() * numbers[1]) + numbers[0]);
    },
    square:function(numbers) {
        return Math.pow(numbers[0], 2);
    }
};

exports.MathFuncs = MathFuncs;

var VarAssembler = {
    setvar:function(arguments, dict) {
        dict.set(arguments[0].name, arguments[1]);
        return arguments[0].name + " -> " + arguments[1].repr();
    },
    getvar:function(arguments, dict) {
        return dict.get(arguments[0].name);
    }
};

exports.VarAssembler = VarAssembler;

var StrAssembler = {
    concat:function(arguments) {
        var first = arguments.shift();
        for(var key in arguments) {
            first.concat(arguments[key]);
        }
        return first.repr();
    }
};

exports.StrAssembler = StrAssembler;


