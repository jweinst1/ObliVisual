/**
 * Created by Josh on 3/18/16.
 */

function checkarguments(args, num) {
    return args.length === num
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
        return elements[0] > elements[1]
    },
    lt:function(elements) {
        return elements[0] < elements[1]
    }
};

//exports the bool assembler
exports.BoolAseembler = BoolAssembler;


