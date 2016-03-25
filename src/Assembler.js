/**
 * File that handles the assembly of arguments passed through the command dictionary
 */

//checks if arguments length too long or short
function checkarguments(args, num) {
    if(args.length !== num) throw "arguments too long or too short";
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
        return total;
    },
    multiply:function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.multiply(numbers[elem]);
        }
        return total;
    },
    divide:function(numbers) {
        var total = numbers.shift();
        for (var elem in numbers) {
            total.divide(numbers[elem]);
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


