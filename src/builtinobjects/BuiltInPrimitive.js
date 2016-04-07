/**
 * Created by Josh on 3/25/16.
 */

//number object
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

exports.NumberObj = NumberObj;

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

//multi use collection object, combines sets, lists, and maps into a javascript array
//rift object
/*
 The elements of a rift belong to a part of a sort of ordered elements, a distinct set, and a mapping collection, all at the same time.
 However, inserted objects must be wrapped in an object of some type, or else they will be confused with keys
 */

var Rift = (function () {
    function Rift() {
        this.type = "rift";
        this.collection = [];
    }
    //small instance object to keep track of counts
    function Node(value) {
        this.count = 1;
        this.value = value;
    }
    Rift.prototype.repr = function() {
        return this.collection;
    };
    Rift.prototype.display = function() {
        return JSON.stringify(this.colleciton);
    };
    Rift.prototype.append = function(other) {
        this.collection.push(other);
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            this.collection[elem].count += 1;
        }
        else {
            this.collection[elem] = new Node(null);
        }
    };
    //appends all elements in a javascript array to the collection
    Rift.prototype.appendarr = function(arr) {
        for(var i=0;i<arr.length;i++) {
            this.append(arr[i]);
        }
    };
    //appends new element to the first index, or left side
    Rift.prototype.appendleft = function(other) {
        this.collection.unshift(other);
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            this.collection[elem].count += 1;
        }
        else {
            this.collection[elem] = new Node(null);
        }
    };
    //non destructive inserting method
    Rift.prototype.insert = function(other, index) {
        index = index % this.collection.length;
        if(isNaN(index)) return false;
        this.collection.splice(index, 0, other);
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            this.collection[elem].count += 1;
        }
        else {
            this.collection[elem] = new Node(null);
        }
    };
    //O(1) determination of existence
    Rift.prototype.contains = function(other) {
        return JSON.stringify(other) in this.collection;
    };
    Rift.prototype.count = function(other) {
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            return this.collection[other].count;
        }
        else {
            return 0;
        }
    };
    //keeps track of numerability and doesn't delete if multiple elements
    Rift.prototype.pop = function() {
        var popped = this.collection.pop();
        var popstr = JSON.stringify(popped);
        if(popstr in this.collection) {
            if(this.collection[popstr].count > 1) {
                this.collection[popstr].count -= 1;
                return popped;
            }
            else {
                delete this.collection[popstr];
                return popped;
            }
        }
    };
    Rift.prototype.remove = function(other) {
        var removed = JSON.stringify(other);
        for(var i=0;i<this.collection.length;i++) {
            if(JSON.stringify(this.collection[i]) === removed) {
                this.collection.splice(i, 1);
                if(this.collection[removed].count > 1) {
                    this.collection[removed] -= 1;
                    return true;
                }
                else {
                    delete this.collection[removed];
                    return true;
                }
            }
        }
    };
    /*Deletes all occurences of other in the collection*/
    Rift.prototype.removeall = function(other) {
        var removed = JSON.stringify(other);
        for(var i=0;i<this.collection.length;i++) {
            if(JSON.stringify(this.collection[i]) === removed) {
                this.collection(i, 1);
            }
        }
        delete this.collection[removed];
    };
    //sets a value if an only if that value is already present in the collection
    Rift.prototype.setvalue = function(key, val) {
        var stringed = JSON.stringify(key);
        if(stringed in this.collection) {
            this.collection[stringed].value = val;
        }
    };
    /*appends a new object, and sets a new value associated with it. Does not append if key alredy present*/
    Rift.prototype.set = function(key, val) {
        var stringed = JSON.stringify(key);
        if(stringed in this.collection) {
            this.collection[stringed].value = val;
        }
        else {
            this.collection[stringed] = new Node(val);
            this.collection.push(key);
        }
    };
    /*attempts to retrieve the value associated with a key. If no value, returns null
     if the key does not exist, will return false*/
    Rift.prototype.get = function(key) {
        var stringed = JSON.stringify(key);
        if(stringed in this.collection) {
            return this.collection[stringed].value;
        }
        else {
            return false;
        }
    };
    Rift.prototype.indexOf = function(item) {
        var stringed = JSON.stringify(item);
        //optimization step where if the item is not in the collection, it will not search.
        if(!(stringed in this.collection)) return false;
        for(var i=0;i<this.collection.length;i++) {
            if(JSON.stringify(this.collection[i]) === stringed) {
                return i;
            }
        }
        return false;
    };
    /*Returns the numerical indexed value, with the input of a number type.
     Returns false if the collection is empty, or the input is NaN*/
    Rift.prototype.index = function(num) {
        num = num % this.collection.length;
        if(isNaN(num)) {
            return false;
        }
        else {
            return this.collection[num];
        }
    };
    Rift.prototype.equals = function(other) {
        var result = JSON.stringify(this) === JSON.stringify(other);
        return result;
    };
    //gets the length of entire collection, not just indexed items
    Rift.prototype.length = function() {
        var total = 0;
        for(var key in this.collection) {
            total += 1;
        }
        return total;
    };
    Rift.prototype.slice = function(start, end) {
        end = end % this.collection.length;
        start = start % this.collection.length;
        if(isNaN(start) || isNaN(end)) {
            return false;
        }
        else {
            return this.collection.slice(start, end);
        }
    };
    /*Prints all keys and indexes in the collection*/
    Rift.prototype.printKeys = function() {
        for(var key in this.collection) {
            console.log(key);
        }
    };
    /*Prints all ordered elements in the collection*/
    Rift.prototype.printOrdered = function() {
        for(var i=0;i<this.collection.length;i++) {
            console.log(this.collection[i]);
        }
    };
    /*returns an array slice containing only the ordered elements of the collection*/
    Rift.prototype.orderedCollection = function() {
        return this.collection.slice(0, this.collection.length);
    };
    return Rift;
})();

exports.Rift = Rift;


//capsule object for enabling object linking across references
var ObjCapsule = function(obj, valname) {
    this.obj = obj;
    this.valname = valname;
    this.val = obj[valname];
    ObjCapsule.prototype.set = function(val) {
        this.obj[this.valname] = val;
        this.val = this.obj[this.valname];
    };
    ObjCapsule.prototype.get = function() {
        return this.val;
    };
};

