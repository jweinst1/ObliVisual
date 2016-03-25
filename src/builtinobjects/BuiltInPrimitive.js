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
};

exports.NumberObj = NumberObj;

