(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.oblivion = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * File that handles the assembly of arguments passed through the command dictionary
 */

//checks if arguments length too long or short
function checkarguments(args, num) {
    if(args.length !== num) return "arguments too long or too short";
}

    //assembles math statements from arrays
var MathAssembler = {
    add:function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.add(numbers[elem]);
        }
        return total.value;
    },
    subtract:function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.subtract(numbers[elem]);
        }
        return total.value;
    },
    multiply:function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.multiply(numbers[elem]);
        }
        return total.value;
    },
    divide:function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.divide(numbers[elem]);
        }
        return total.value;
    }

};

exports.MathAssembler = MathAssembler;

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



},{}],2:[function(require,module,exports){
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
},{"./builtinobjects/BuiltInPrimitive.js":8}],3:[function(require,module,exports){
var cmds = require("./commands/commands.json");
var asm = require("./Assembler.js");
var argcon = require("./argumentcontainers.js");
var ti = require("./TypeInference.js");
var ut = require("./Utils.js");
var dict = require("./VariableDictionary.js");
var chk = require("./ErrorChecker.js");
//main interpreter object


var Interpreter = (function () {
    function Interpreter() {
        this.globals = new dict.VariableDict();
    }

    Interpreter.prototype.interpretLine = function (line) {
        var margMode = false;
        var tokens = line.split(" ");
        var arguments = [];
        var current = cmds;
        while (tokens.length>0) {
            var temp = tokens.shift();
            if (temp in current) {
                current = current[temp];
            }
            else if ("**marg**" in current) {
                arguments.push(ti.ParseType(temp, this.globals));
                if (tokens.length==0) current = current["**marg**"];
            }
            else if ("**arg**" in current) {
                arguments.push(ti.ParseType(temp, this.globals));
                current = current["**arg**"];
            }
            else {
                //breaks loop if non-formed statement encountered
                return "Invalid Statement"
            }
        }
        //console.log(arguments);
        //need processing
        var linetype = ut.GetSingleKey(current);
        if(chk.checkargs(linetype, arguments)) return "Argument Error";
        switch(linetype) {
            case "[print]":
                return arguments[0].repr();
                break;
            case "[addition]":
                return asm.MathAssembler.add(arguments);
                break;
            case "[strconcat]":
                return asm.StrAssembler.concat(arguments);
                break;
            case "[assignment]":
                return asm.VarAssembler.setvar(arguments, this.globals);
                break;
            case "[squareop]":
                return asm.MathFuncs.square(arguments);
                break;
            case "[powerop]":
                return asm.MathFuncs.power(arguments);
                break;
            case "[subtraction]":
                return asm.MathAssembler.subtract(arguments);
                break;
            case "[multiplication]":
                return asm.MathAssembler.multiply(arguments);
                break;
            case "[division]":
                return asm.MathAssembler.divide(arguments);
                break;
            case "[equalop]":
                return asm.BoolAseembler.equals(arguments);
                break;
            case "[greaterthan]":
                return asm.BoolAseembler.gt(arguments);
                break;
            case "[lesserthan]":
                return asm.BoolAseembler.lt(arguments);
                break;
            default:
                console.log("Statement Type not picked")
        }
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;



},{"./Assembler.js":1,"./ErrorChecker.js":2,"./TypeInference.js":4,"./Utils.js":5,"./VariableDictionary.js":6,"./argumentcontainers.js":7,"./commands/commands.json":9}],4:[function(require,module,exports){
var bip = require("./builtinobjects/BuiltInPrimitive.js");
//file for infering types.


//parses types in tokens
var ParseType = function(token, vardict) {
    if (/[0-9]+/.test(token)) return new bip.NumberObj(parseInt(token));
    else if (/^".*?"$/.test(token)) {
        return new bip.StringObj(token.slice(1, token.length-1));
    }
    else if(/^\@[a-zA-Z]+$/.test(token)) {
        token = token.slice(1, token.length);
        if(vardict.check(token)) return vardict.get(token);
        else {
            return new bip.NameObj(token);
        }
    }
};

exports.ParseType = ParseType;
},{"./builtinobjects/BuiltInPrimitive.js":8}],5:[function(require,module,exports){
/**
 * Created by Josh on 3/20/16.
 */

//utils file

    //gets a single key in an obj
var GetSingleKey = function(obj) {
    for(var key in obj) var label = key;
    return label;
};

exports.GetSingleKey = GetSingleKey;
},{}],6:[function(require,module,exports){
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
        delete this[name];
    };
};

exports.VariableDict = VariableDict;
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
        return this.value.toString();
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
        return "@" + this.name;
    };
};

exports.NameObj = NameObj;




},{}],9:[function(require,module,exports){
module.exports={
  "subtract": {
    "**arg**": {
      "from": {
        "**arg**": {
          "[subtraction]": {}}}}},
  "**arg**": {
    "plus": {
      "**arg**": {
        "[addition]": {}}},
    "minus": {
      "**arg**":{
        "[subtraction]":{}}},
    "times":{
      "**arg**":{
        "[multiplication]":{}}},
    "equals":{
      "**arg**":{
        "[equalop]":{}}},
    "squared":{
      "[squareop]":{}},
    "is":{
      "greater":{
        "than":{
          "**arg**":{
            "[greaterthan]":{}}}},
      "lesser":{
        "than":{
          "**arg**":{
            "[lesserthan]":{}}}}}},
  "add": {
    "**arg**": {
      "with": {
        "**arg**": {
          "[addition]": {}}},
      "to": {
        "**arg**": {
          "[addition]": {}}},
      "and": {
        "**arg**": {
          "[addition]": {}}},
      "plus":{
        "**arg**":{
          "[addition]":{}}}}},
  "sum":{
    "the":{
      "numbers":{
        "**marg**":{
          "[addition]":{}}}},
    "these":{
      "numbers":{
        "**marg**":{
          "[addition]":{}}}}},
  "print": {
    "**arg**": {
      "[print]": {}}},
  "display": {
    "**arg**": {
      "[print]": {}}},
  "show":{
    "**arg**":{
      "[print]":{}}},
  "increment":{
    "**arg**":{
      "by":{
        "**arg**":{
          "[addition]":{}}}}},
  "multiply":{
    "**arg**":{
      "by":{
        "**arg**":{
          "[multiplication]":{}}}}},
  "divide":{
    "**arg**":{
      "by":{
        "**arg**":{
          "[division]":{}}}}},
  "raise":{
    "**arg**":{
      "by":{
        "**arg**":{
          "[powerop]":{}}}}},
  "assign":{
    "**arg**":{
      "to":{
        "**arg**":{
          "[assignment]":{}}}}},
  "get":{
    "**arg**":{
      "[print]":{}}},
  "fuse":{
    "**arg**":{
      "and":{
        "**arg**":{
          "[strconcat]":{}}},
      "with":{
        "**arg**":{
          "[strconcat]":{}}}},
    "the":{
      "strings":{
        "**marg**":{
          "[strconcat]":{}}}}},
  "bind":{
    "**arg**":{
      "to":{
        "**arg**":{
          "[assignment]":{}}}}}
}
},{}]},{},[3])(3)
});