/**
 * File that handles the assembly of arguments passed through the command dictionary
 */

//checks if arguments length too long or short
function checkarguments(args, num) {
    if(args.length !== num) return "arguments too long or too short";
}

    //assembles math statements from arrays
var MathAssembler = {
    "+=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.add(numbers[elem]);
        }
        return total.value;
    },
    "-=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.subtract(numbers[elem]);
        }
        return total.value;
    },
    "*=":function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.multiply(numbers[elem]);
        }
        return total.value;
    },
    "/=":function(numbers) {
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


