//typescript version of built in objects
var NumberObj = (function () {
    function NumberObj(value) {
        this.type = "number";
        this.value = value;
    }
    NumberObj.prototype.repr = function () {
        return this.value;
    };
    NumberObj.prototype.display = function () {
        return this.value;
    };
    NumberObj.prototype.increment = function () {
        this.value += 1;
    };
    NumberObj.prototype.decrement = function () {
        this.value -= 1;
    };
    NumberObj.prototype.concat = function (other) {
        this.value = parseInt(this.value.toString() + other.value.toString());
    };
    NumberObj.prototype.index = function (other) {
        if (other.value < 0) {
            return new NumberObj(-1);
        }
        else if (other.value < this.value) {
            return new NumberObj(1);
        }
        else {
            return new NumberObj(0);
        }
    };
    NumberObj.prototype.insert = function (key, other) {
        this.value += other.value;
    };
    NumberObj.prototype.add = function (other) {
        return new NumberObj(this.value + other.value);
    };
    NumberObj.prototype.subtract = function (other) {
        return new NumberObj(this.value - other.value);
    };
    NumberObj.prototype.multiply = function (other) {
        return new NumberObj(this.value * other.value);
    };
    NumberObj.prototype.divide = function (other) {
        if (other.value === 0) {
            return new NumberObj(this.value);
        }
        else {
            return new NumberObj(this.value / other.value);
        }
    };
    NumberObj.prototype.remainder = function (other) {
        return new NumberObj(this.value % other.value);
    };
    NumberObj.prototype.power = function (other) {
        return new NumberObj(Math.pow(this.value, other.value));
    };
    NumberObj.prototype.addassign = function (other) {
        this.value += other.value;
    };
    NumberObj.prototype.subassign = function (other) {
        this.value -= other.value;
    };
    NumberObj.prototype.multiplyassign = function (other) {
        this.value *= other.value;
    };
    NumberObj.prototype.divideassign = function (other) {
        if (other.value === 0) {
            this.value += 0;
        }
        else {
            this.value /= other.value;
        }
    };
    NumberObj.prototype.remainderassign = function (other) {
        this.value %= other.value;
    };
    NumberObj.prototype.setitem = function (key, other) {
        this.value += other.value - 1;
    };
    NumberObj.prototype.append = function (other) {
        this.value += other.value;
    };
    NumberObj.prototype.pop = function () {
        this.value -= 1;
        if (this.value >= 0)
            return new NumberObj(1);
        else
            return new NumberObj(-1);
    };
    NumberObj.prototype.remove = function (key) {
        this.value -= 1;
    };
    NumberObj.prototype.count = function (other) {
        if (other.value === 0) {
            return new NumberObj(0);
        }
        else {
            return new NumberObj(Math.floor(this.value / other.value));
        }
    };
    NumberObj.prototype.length = function () {
        return new NumberObj(this.value.toString().length);
    };
    //returns a boolean, must be updated to return a bool object
    NumberObj.prototype.contains = function (other) {
        return other.value < this.value;
    };
    return NumberObj;
})();
var StringObj = (function () {
    function StringObj(value) {
        this.type = "string";
        this.value = value.split("");
    }
    StringObj.prototype.repr = function () {
        return this.value.join("");
    };
    StringObj.prototype.display = function () {
        return '"' + this.value.join("") + '"';
    };
    StringObj.prototype.length = function () {
        return new NumberObj(this.value.length);
    };
    StringObj.prototype.concat = function (other) {
        this.value = this.value.concat(other.value);
    };
    //adds a space to end of string
    StringObj.prototype.increment = function () {
        this.value = this.value.concat([" "]);
    };
    StringObj.prototype.decrement = function () {
        this.value.pop();
    };
    StringObj.prototype.index = function (key) {
        return new StringObj(this.value[key.value]);
    };
    StringObj.prototype.insert = function (key, other) {
        if (key.value >= 0 && key.value < this.value.length) {
            for (var i = 0; i < other.value.length; i++) {
                this.value.splice(key.value, 0, other.value[i]);
            }
        }
        else {
            //if index is out of bounds, will set at zero position
            for (var i = 0; i < other.value.length; i++) {
                this.value.splice(0, 0, other.value[i]);
            }
        }
    };
    //destructive version of insert method for strings.
    StringObj.prototype.setitem = function (key, other) {
        if (key.value >= 0 && key.value < this.value.length) {
            this.value.splice(key.value, 1);
            for (var i = 0; i < other.value.length; i++) {
                this.value.splice(key.value, 0, other.value[i]);
            }
        }
        else {
            this.value.splice(0, 1);
            //if index is out of bounds, will set at zero position
            for (var i = 0; i < other.value.length; i++) {
                this.value.splice(0, 0, other.value[i]);
            }
        }
    };
    StringObj.prototype.add = function (other) {
        return new StringObj(this.value.join("") + other.value.join(""));
    };
    StringObj.prototype.append = function (other) {
        this.value = this.value.concat(other.value);
    };
    StringObj.prototype.pop = function () {
        return new StringObj(this.value[this.value.length]);
    };
    StringObj.prototype.remove = function (key) {
        this.value = this.value.join("").replace(key.repr(), "").split("");
    };
    StringObj.prototype.count = function (other) {
        var count = 0;
        var tempstring = this.value.join("");
        while (tempstring.search(other.repr()) !== -1) {
            count += 1;
            tempstring = tempstring.replace(other.repr(), "");
        }
        return new NumberObj(count);
    };
    StringObj.prototype.contains = function (other) {
        return new BoolObj(this.repr().search(other.repr()) !== -1);
    };
    StringObj.prototype.subtract = function (other) {
        return new StringObj(this.value.join("").replace(other.repr(), ""));
    };
    StringObj.prototype.multiply = function (other) {
        var count = other.value.length;
        var newstr = new StringObj(this.repr());
        for (var i = 0; i < count; i++) {
            newstr.append(other);
        }
        return newstr;
    };
    //produces a repeat string object of the sum of both strings lengths attributes
    StringObj.prototype.power = function (other) {
        var newlength = this.value.length + other.value.length;
        var newstr = new StringObj("");
        for (var i = 0; i < newlength; i++) {
            newstr.append(this);
            newstr.append(other);
        }
        return newstr;
    };
    //returns a string split by the other string as the delimeter
    StringObj.prototype.divide = function (other) {
        return new StringObj(this.repr().split(other.repr()));
    };
    //remove all oeprator for strings
    StringObj.prototype.remainder = function (other) {
        var patt = new RegExp(other.repr(), "g");
        return new StringObj(this.value.join("").replace(patt, ""));
    };
    StringObj.prototype.addassign = function (other) {
        this.append(other);
    };
    StringObj.prototype.subassign = function (other) {
        this.value = this.value.join("").replace(other.repr(), "").split("");
    };
    StringObj.prototype.multiplyassign = function (other) {
        var count = other.value.length;
        for (var i = 0; i < count; i++) {
            this.append(other);
        }
    };
    StringObj.prototype.divideassign = function (other) {
        this.value = this.repr().split(other.repr());
    };
    StringObj.prototype.remainderassign = function (other) {
        var patt = new RegExp(other.repr(), "g");
        this.value = this.value.join("").replace(patt, "").split("");
    };
    return StringObj;
})();
var ListObj = (function () {
    function ListObj() {
        this.value = [];
        this.type = "list";
    }
    ListObj.prototype.repr = function () {
        return this.value;
    };
    return ListObj;
})();
var SetObj = (function () {
    function SetObj() {
    }
    return SetObj;
})();
var MapObj = (function () {
    function MapObj() {
    }
    return MapObj;
})();
var BoolObj = (function () {
    function BoolObj(state) {
        this.state = state;
        this.type = "Bool";
    }
    BoolObj.prototype.repr = function () {
        return this.state;
    };
    return BoolObj;
})();
//# sourceMappingURL=PrimitiveObjects.js.map