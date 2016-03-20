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