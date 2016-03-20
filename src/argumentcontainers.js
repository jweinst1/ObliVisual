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