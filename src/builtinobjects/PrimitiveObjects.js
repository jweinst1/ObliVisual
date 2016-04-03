//typescript version of built in objects
var NumberObj = (function () {
    function NumberObj(value) {
        this.type = "number";
        this.value = value;
    }
    NumberObj.prototype.repr = function () {
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
    return NumberObj;
})();
var StringObj = (function () {
    function StringObj() {
    }
    return StringObj;
})();
var ListObj = (function () {
    function ListObj() {
    }
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
//# sourceMappingURL=PrimitiveObjects.js.map