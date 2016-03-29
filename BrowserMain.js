(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.oblivion = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        numbers.unshift(total);
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
            else if(args[0].type === "list" && args[1].type === "list") {
                args[0].extend(args[1]);
                args.splice(1, 1);
            }
        }
    },
    "^":function(args) {
        if(args.length === 1) {
            if(args[0].type === "list") {
                args[0] = new bip.NumberObj(Math.max.apply(Math, args[0].list));
            }
        }
        while(args.length > 1) {
            if(args[0].type === "number" && args[1].type === "number") {
                args[0] = new bip.NumberObj(Math.max(args[0].value, args[1].value));
                args.splice(1, 1);
            }
            else if(args[0].type === "list" && args[1].type === "number") {
                if(isNaN(Math.max.apply(Math, args[0].list))) {
                    args.splice(0, 1);
                }
                else {
                    args[0] = new bip.NumberObj(Math.max.apply(Math, args[0].list));
                }
            }
            else if(args[1].type === "list" && args[1].type === "number") {
                if(isNaN(Math.max.apply(Math, args[1].list))) {
                    args.splice(1, 1);
                }
                else {
                    args[1] = new bip.NumberObj(Math.max.apply(Math, args[1].list));
                }
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
        numbers.unshift(total);
    },
    "*=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.multiply(numbers[elem]);
        }
        numbers.unshift(total);
    },
    "/=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.divide(numbers[elem]);
        }
        numbers.unshift(total);
    },
    "%=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.remainder(numbers[elem]);
        }
        numbers.unshift(total);
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
    },
    "=":function(args, dict) {
        if (args[0].type === "name" && args.length > 1) {
            dict.set(args[0].name, args[1]);
        }
        else if (args[0].name && args.length > 1) {
            dict.set(args[0].name, args[1]);
            args.unshift(dict.get(args[0].name));
        }
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



},{"./builtinobjects/BuiltInPrimitive.js":7}],2:[function(require,module,exports){
/**
 * Created by Josh on 3/26/16.
 */
//file that contains error checking function for arguments and statement types.
var bip = require("./builtinobjects/BuiltInPrimitive.js");
var checkargs = function(statement, args) {
    switch(statement) {
        case "[addition]":
            return checkfornumbers(args);
            break;
        case "[subtraction]":
            return checkfornumbers(args);
            break;
        case "[multiplication]":
            return checkfornumbers(args);
            break;
        case "[division]":
            return checkfornumbers(args);
            break;
        case "[strconcat]":
            return checkforstrs(args);
            break;
        default:
            return false;
    }
};

//exports the function that uses all other error functions
exports.checkargs = checkargs;

//checks number arguments
var checkfornumbers = function(args) {
    for(var key in args) {
        if(args[key].constructor !== bip.NumberObj) {
            return true;
        }
    }
    return false;
};

var checkforstrs = function(strs) {
    for(var key in args) {
        if(args[key].constructor !== bip.StringObj) {
            return true;
        }
    }
    return false;
};
},{"./builtinobjects/BuiltInPrimitive.js":7}],3:[function(require,module,exports){
var asm = require("./Assembler.js");
var argcon = require("./argumentcontainers.js");
var ti = require("./TypeInference.js");
var dict = require("./VariableDictionary.js");
var chk = require("./ErrorChecker.js");
//main interpreter object


var Interpreter = (function () {
    function Interpreter() {
        this.globals = new dict.VariableDict();
        this.stringmode = false;
    }

    Interpreter.prototype.interpretLine = function (line) {
        var tokens = line.split(" ");
        var arguments = [];
        for(var i=tokens.length-1;i>=0;i-=1) {
            if(tokens[i] in asm.stdAssembler) {
                asm.stdAssembler[tokens[i]](arguments, this.globals);
            }
            else {
                arguments.unshift(ti.ParseType(tokens[i], this.globals));
            }
        }
        console.log(arguments[0]);
        if(arguments[0] === undefined) return "Syntax Error";
        return arguments[0].repr();
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;



},{"./Assembler.js":1,"./ErrorChecker.js":2,"./TypeInference.js":4,"./VariableDictionary.js":5,"./argumentcontainers.js":6}],4:[function(require,module,exports){
var bip = require("./builtinobjects/BuiltInPrimitive.js");
//file for infering types.


//parses types in tokens
var ParseType = function(token, vardict) {
    if (/^[0-9]+$/.test(token)) return new bip.NumberObj(parseInt(token));
    else if (token[0] === '"' && token[token.length-1] === '"') {
        return new bip.StringObj(token.slice(1, token.length-1));
    }
    else if(token === "[]") {
        return new bip.ListObj();
    }
    else if(/^\@[a-zA-Z]+$/.test(token)) {
        token = token.slice(0, token.length);
        if(vardict.check(token)) {
            var retrieve = vardict.get(token);
            retrieve["name"] = token;
            return retrieve;
        }
        else {
            return new bip.NameObj(token);
        }
    }
};

exports.ParseType = ParseType;
},{"./builtinobjects/BuiltInPrimitive.js":7}],5:[function(require,module,exports){
/**
 * Created by Josh on 3/24/16.
 */

//functions as overloaded object wrapper to store variables and objects.
var VariableDict = function() {
    VariableDict.prototype.set = function(name, obj) {
        this[name] = obj;
    };
    VariableDict.prototype.get = function(name) {
        return this[name];
    };
    VariableDict.prototype.check = function(name) {
        return name in this;
    };
    VariableDict.prototype.del = function(name) {
        if(name in this) delete this[name];
    };
};

exports.VariableDict = VariableDict;
},{}],6:[function(require,module,exports){
/**
 * Created by Josh on 3/19/16.
 */
//file that keeps instance objects to contain user arguments

    //dual pairing object
var Pair = function(first, second) {
    this.first = typeof first !== 'undefined' ?  first : null;
    this.second = typeof second !== 'undefined' ?  second : null;
    this.setfirst = function(value) {
        this.first = value;
    };
    this.setsecond = function (value) {
        this.second = value;
    };
};

exports.Pair = Pair;

var ArgArray = function(arr, statement) {
    this.arr = arr;
    this.statement = statement;
    this.getfirst = function(){
        return arr[0];
    }
};

exports.ArgArray = ArgArray;


var ArgStack = function() {
    this.stack = [];
    this.push = function(elem) {
        this.stack.unshift(elem);
    };
    this.pull = function() {
        return this.stack.shift();
    };
    //non destructive version of pull
    this.peek = function() {
        return this.stack[0];
    }
};

exports.ArgStack = ArgStack;
},{}],7:[function(require,module,exports){
/**
 * Created by Josh on 3/25/16.
 */

//number object
var NumberObj = function(value) {
    this.value = value;
    this.type = "number";
    //mutating methods
    NumberObj.prototype.add = function(amount) {
        if(amount.constructor === NumberObj) {
            this.value += amount.value;
        }
        else {
            this.value += amount;
        }
    };
    NumberObj.prototype.subtract = function(amount) {
        if(amount.constructor === NumberObj) {
            this.value -= amount.value;
        }
        else {
            this.value -= amount;
        }
    };
    NumberObj.prototype.multiply = function(amount) {
        if(amount.constructor === NumberObj) {
            this.value *= amount.value;
        }
        else {
            this.value *= amount;
        }
    };
    NumberObj.prototype.divide = function(amount) {
        if(amount.constructor === NumberObj) {
            if(amount.value===0) this.value += 0;
            else this.value /= amount.value;
        }
        else {
            if(amount===0) this.value += 0;
            else this.value /= amount;
        }
    };
    NumberObj.prototype.remainder = function(amount) {
        if(amount.constructor === NumberObj) {
            this.value %= amount.value;
        }
        else {
            this.value %= amount;
        }
    };
    NumberObj.prototype.power = function(amount) {
        if(amount.constructor === NumberObj) {
            this.value = Math.pow(this.value, amount.value);
        }
        else {
            this.value = Math.pow(this.value, amount);
        }
    };
    NumberObj.prototype.sqrt = function() {
        this.value = Math.sqrt(this.value);
    };
    //non-mutating methods
    NumberObj.prototype.repr = function() {
        return this.value;
    };
};

exports.NumberObj = NumberObj;

var StringObj = function(string) {
    this.string = string;
    this.type = "string";

    StringObj.prototype.repr = function() {
        return "\"" + this.string + "\"";
    };
    StringObj.prototype.concat = function(addstring) {
        this.string += addstring.string;
    };
    //gets new string object of last character
    StringObj.prototype.getlast = function() {
        return new StringObj(this.string[this.string.length-1]);
    };
    //gets new string object for first character
    StringObj.prototype.getfirst = function() {
        return new StringObj(this.string[0]);
    };
};

exports.StringObj = StringObj;

//a name object, which represents an unbound variable.
var NameObj = function(name) {
    this.name = name;
    this.type = "name";
    NameObj.prototype.repr = function() {
        return this.name;
    };
};

exports.NameObj = NameObj;

//boolean object for the language
var BoolObj = function(state) {
    this.state = state;
    this.type = "bool";
    BoolObj.prototype.repr = function() {
        return this.state;
    };
};

exports.BoolObj = BoolObj;

//error object
var ErrorObj = function(message) {
    this.message = message;
    this.type = "error";
    ErrorObj.prototype.repr = function() {
        return this.message;
    };
};

exports.ErrorObj = ErrorObj;

//list object
var ListObj = function() {
    this.list = [];
    this.type = "list";

    ListObj.prototype.repr = function() {
        if(this.list === []) return this.list;
        var display = [];
        for(var key in this.list) display.push(this.list[key].repr());
        return display;
    };

    ListObj.prototype.append = function(elem) {
        this.list.push(elem);
    };
    ListObj.prototype.extend = function(elem) {
        if(elem.type === "list") this.list.concat(elem.list);
    };
};

exports.ListObj = ListObj;


},{}]},{},[3])(3)
});
