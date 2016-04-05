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
        return this.value.toString();
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
//range object
var RangeObj = (function () {
    function RangeObj(start, end) {
        this.type = "range";
        this.start = start;
        this.end = end;
    }
    //returns an object containing the start and end points of the range
    RangeObj.prototype.repr = function () {
        return { end: this.end.repr(), start: this.start.repr() };
    };
    RangeObj.prototype.display = function () {
        return this.start.display() + "<-->" + this.end.display();
    };
    RangeObj.prototype.increment = function () {
        this.start.value += 1;
        this.end.value += 1;
    };
    RangeObj.prototype.decrement = function () {
        this.start.value -= 1;
        this.end.value -= 1;
    };
    RangeObj.prototype.concat = function (other) {
    };
    RangeObj.prototype.index = function (other) {
    };
    return RangeObj;
})();
var ListObj = (function () {
    function ListObj() {
        this.value = [];
        this.type = "list";
    }
    ListObj.prototype.repr = function () {
        return this.value;
    };
    ListObj.prototype.display = function () {
        return JSON.stringify(this.value);
    };
    ListObj.prototype.increment = function () {
        this.value.push(new NothingObj());
    };
    ListObj.prototype.decrement = function () {
        this.value.pop();
    };
    ListObj.prototype.concat = function (other) {
        this.value = this.value.concat(other.value);
    };
    ListObj.prototype.index = function (key) {
        var ind = key.value % this.value.length;
        return this.value[ind];
    };
    ListObj.prototype.setitem = function (key, other) {
        if (key.value >= 0 && key.value < this.value.length) {
            this.value[key.value] = other;
        }
        else if (key.value < 0) {
            this.value[0] = other;
        }
        else {
            this.value[this.value.length - 1] = other;
        }
    };
    ListObj.prototype.append = function (other) {
        this.value.push(other);
    };
    ListObj.prototype.pop = function () {
        return this.value.pop();
    };
    ListObj.prototype.remove = function (key) {
        var ind = key.value % this.value.length - 1;
        this.value.splice(ind, 1);
    };
    ListObj.prototype.count = function (other) {
        var total = 0;
        for (var i = 0; i < this.value.length; i++) {
            if (this.value[i] === other) {
                total += 1;
            }
        }
        return new NumberObj(total);
    };
    //linear search
    ListObj.prototype.contains = function (other) {
        var contain = false;
        for (var i = 0; i < this.value.length; i++) {
            if (this.value[i] === other) {
                return new BoolObj(true);
            }
        }
        return new BoolObj(contain);
    };
    ListObj.prototype.length = function () {
        return new NumberObj(this.value.length);
    };
    ListObj.prototype.insert = function (key, other) {
        var ind = key.value % this.value.length;
        this.value.splice(ind, 0, other);
    };
    ListObj.prototype.add = function (other) {
        var newlist = new ListObj();
        newlist.value = this.value.concat(other.value);
        return newlist;
    };
    //subtracts all items in one list, from the other list
    ListObj.prototype.subtract = function (other) {
        var newlist = new ListObj();
        for (var i = 0; i < this.value.length; i++) {
            for (var j = 0; j < other.value.length; j++) {
                if (this.value[i] === other.value[j]) {
                    newlist.append(other.value[i]);
                }
            }
        }
        return newlist;
    };
    ListObj.prototype.multiply = function (other) {
        var newlist = new ListObj();
        for (var i = 0; i < other.value.length; i++)
            newlist.value = this.value.concat(other.value);
        return newlist;
    };
    //future implementation, needs revising
    ListObj.prototype.divide = function (other) {
        return this;
    };
    //future implementation
    ListObj.prototype.remainder = function (other) {
        return this;
    };
    ListObj.prototype.power = function (other) {
        return this;
    };
    ListObj.prototype.addassign = function (other) {
        this.append(other);
    };
    ListObj.prototype.subassign = function (other) {
        this.value = this.subtract(other).value;
    };
    ListObj.prototype.multiplyassign = function (other) {
        this.value = this.multiply(other).value;
    };
    ListObj.prototype.divideassign = function (other) {
        this.value = this.divide(other).value;
    };
    ListObj.prototype.remainderassign = function (other) {
        this.value = this.remainder(other).value;
    };
    return ListObj;
})();
var SetObj = (function () {
    function SetObj() {
        this.type = "set";
        this.value = {};
    }
    SetObj.prototype.repr = function () {
        return this.value;
    };
    SetObj.prototype.display = function () {
        return JSON.stringify(this.value);
    };
    SetObj.prototype.increment = function () {
    };
    SetObj.prototype.decrement = function () {
    };
    SetObj.prototype.concat = function (other) {
        for (var key in other.value) {
            if (!(key in this.value)) {
                this.value[key] = true;
            }
        }
    };
    //same as contains, returns bool object
    SetObj.prototype.index = function (key) {
        var boolresult = JSON.stringify(key) in this.value;
        return new BoolObj(boolresult);
    };
    SetObj.prototype.setitem = function (key, other) {
        this.value[JSON.stringify(key)] = true;
    };
    SetObj.prototype.append = function (other) {
        var key = JSON.stringify(other);
        if (!(key in this.value)) {
            this.value[key] = true;
        }
    };
    //returns a random object from the set
    SetObj.prototype.pop = function () {
        for (var key in this.value) {
            return JSON.parse(key);
        }
    };
    SetObj.prototype.remove = function (other) {
        var stringed = JSON.stringify(other);
        delete this.value[stringed];
    };
    SetObj.prototype.count = function (other) {
        if (JSON.stringify(other) in this.value) {
            return new NumberObj(1);
        }
        else {
            return new NumberObj(0);
        }
    };
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
//implements the nothing type
var NothingObj = (function () {
    function NothingObj() {
        this.type = "nothing";
    }
    NothingObj.prototype.repr = function () {
        return this;
    };
    NothingObj.prototype.display = function () {
        return this.type;
    };
    return NothingObj;
})();
//# sourceMappingURL=PrimitiveObjects.js.map