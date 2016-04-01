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
    StringObj.prototype.pop = function() {
        if(this.string.length > 0) {
            var popped = this.string[this.string.length-1];
            this.string = this.string.slice(0, string.length-1);
            return new StringObj(popped);
        }
    };
    //gets first element of stringobj as new string obj.
    StringObj.prototype.popfirst = function() {
        if(this.string.length > 0) {
            var popped = this.string[0];
            this.string = this.string.slice(1, string.length);
            return new StringObj(popped);
        }
    }
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
    ListObj.prototype.index = function(ind) {
        if(ind > -1 && ind < this.list.length) {
            return this.list[ind];
        }
    };
    ListObj.prototype.pop = function() {
        if(this.list.length > 0) {
            return this.list.pop();
        }
    }
};

exports.ListObj = ListObj;

//Set Object for the oblivion language

var SetObj = function() {
    //takes arbitrary number of arguments
    this.set = {};
    this.type = "set";
    for(var i=0;i<arguments.length;i++) this.set[arguments[i]] = true;

    //methods
    SetObj.prototype.repr = function() {
        var keys = [];
        for(var key in this.set) keys.push(key);
        return "(" + keys.join(", ") + ")";
    };
    SetObj.prototype.add = function(elem) {
        this.set[JSON.stringify(elem.repr())] = true;
    };
    SetObj.prototype.remove = function(elem) {
        if(elem in this.set) delete this.set[elem];
    };
    SetObj.prototype.contains = function(elem) {
        return elem in this.set;
    };
    //checks if current set is subset of another set
    SetObj.prototype.isSubsetof = function(otherset) {
        if(otherset.constructor === SetObj) {
            for(var key in this.set) {
                if(!(key in otherset.set)) {
                    return false;
                }
            }
            return true;
        }
    };
    //checks if there is a subset of the current set
    SetObj.prototype.hasSubset = function(otherset) {
        if(otherset.constructor === SetObj) {
            for(var key in otherset.set) {
                if(!(key in this.set)) {
                    return false;
                }
            }
            return true;
        }
    };
};

exports.SetObj = SetObj;

