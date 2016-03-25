/**
 * File that contains implementation for the number object for the language
 */

var NumberObj = function(value) {
    this.value = value;
    this.type = "number";
    //mutating methods
    NumberObj.prototype.add = function(amount) {
        this.value += amount;
    };
    NumberObj.prototype.subtract = function(amount) {
        this.value -= amount;
    };
    NumberObj.prototype.multiply = function(amount) {
        this.value *= amount;
    };
    NumberObj.prototype.divide = function(amount) {
        if (amount==0) {
            //handling of zero division
            this.value += 0;
        }
        else {
            this.value /= amount;
        }
    };
    NumberObj.prototype.power = function(amount) {
        this.value = Math.pow(this.value, amount);
    };
    NumberObj.prototype.sqrt = function() {
        this.value = Math.sqrt(this.value)
    };
    //non-mutating methods
};

exports.NumberObj = NumberObj;
