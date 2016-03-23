(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Josh on 3/18/16.
 */

//checks if arguments length too long or short
function checkarguments(args, num) {
    if(args.length !== num) throw "arguments too long or too short";
}

    //assembles math statements from arrays
var MathAssembler = {
    add:function(numbers) {
        var total = 0;
        for (var elem in numbers) {
            total += numbers[elem];
        }
        return total;
    },
    subtract:function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total -= numbers[elem];
        }
        return total;
    },
    multiply:function(numbers) {
        var total = 1;
        for (var elem in numbers) {
            total *= numbers[elem];
        }
        return total;
    },
    divide:function(numbers) {
        var total = 1;
        for (var elem in numbers) {
            if (numbers[elem] == 0) {
                total /= 1
            }
            total /= numbers[elem];
        }
        return total;
    }

};

exports.MathAssembler = MathAssembler;

//static functions that deal with boolean comparisons

var BoolAssembler = {
    equals:function(elements) {
        checkarguments(elements, 2);
        return elements[0] === elements[1]
    },
    notequal:function(elements) {
        checkarguments(elements, 2);
        return elements [0] !== elements[1]
    },
    gt:function(elements) {
        checkarguments(elements, 2);
        return elements[0] > elements[1]
    },
    lt:function(elements) {
        return elements[0] < elements[1]
    },
    ge:function(elements) {
        return elements[0] >= elements[1]
    },
    le:function(elements) {
        return elements[0] <= elements[1]
    }
};

//exports the bool assembler
exports.BoolAseembler = BoolAssembler;

//specialized math functions
var MathFuncs = {
    power:function(numbers) {
        return Math.pow(numbers[0], numbers[1])
    },
    random:function(numbers) {
        return Math.floor((Math.random() * numbers[1]) + numbers[0]);
    },
    square:function(numbers) {
        return Math.pow(numbers[0], 2);
    }
};

exports.MathFuncs = MathFuncs;



},{}],2:[function(require,module,exports){
var cmds = require("./commands/commands.json");
var asm = require("./Assembler.js");
var argcon = require("./argumentcontainers.js");
var ti = require("./TypeInference.js");
var ut = require("./Utils.js");
//main interpreter object
var Interpreter = (function () {
    function Interpreter() {
    }

    Interpreter.interpretLine = function (line) {
        var tokens = line.split(" ");
        var arguments = [];
        var current = cmds;
        while (tokens.length>0) {
            var temp = tokens.shift();
            if (temp in current) {
                current = current[temp];
            }
            else if ("**arg**" in current) {
                arguments.push(ti.ParseType(temp));
                current = current["**arg**"];
            }
            else {
                //breaks loop if non-formed statement encountered
                return "Invalid Statement"
            }
        }
        console.log(arguments);
        //need processing
        var linetype = ut.GetSingleKey(current);
        switch(linetype) {
            case "[print]":
                return arguments[0];
                break;
            case "[addition]":
                return asm.MathAssembler.add(arguments);
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
            default:
                console.log("Statement Type not picked")
        }
    };
    return Interpreter;
})();

exports.Interpreter = Interpreter;



},{"./Assembler.js":1,"./TypeInference.js":3,"./Utils.js":4,"./argumentcontainers.js":5,"./commands/commands.json":6}],3:[function(require,module,exports){
/**
 * Created by Josh on 3/20/16.
 */
//file for infering types.


//parses types in tokens
var ParseType = function(token) {
    if (/[0-9]+/.test(token)) return parseInt(token);
    else if (/^".*?"$/.test(token)) {
        return token.slice(1, token.length-1)
    }
};

exports.ParseType = ParseType;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
            "[greaterthan]":{}}}}}},
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
          "[addition]":{}}},
      "[addall]":{}}},
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
          "[increment]":{}}}}},
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
          "[powerop]":{}}}}}
}
},{}]},{},[2]);


