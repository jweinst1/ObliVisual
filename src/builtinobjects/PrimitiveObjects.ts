//typescript version of built in objects

interface Obj {
    type:string;
    repr():any;
    display():any;
    increment():void;
    decrement():void;
    concat(other:any):void;
    index(key:any):any;
    setitem(key:any, other:any):void;
    append(other:any):void;
    pop():any;
    remove(key:any):void;
    count(other:any):any;
    contains(other:any):any;
    length():any;
    insert(key:any, other:any):void;
    add(other:any):any;
    subtract(other:any):any;
    multiply(other:any):any;
    divide(other:any):any;
    remainder(other:any):any;
    power(other:any):any;
    addassign(other:any):void;
    subassign(other:any):void;
    multiplyassign(other:any):void;
    divideassign(other:any):void;
    remainderassign(other:any):void;

}

class NumberObj implements Obj {
    public value:number;
    public type:string;

    constructor(value:any) {
        this.type = "number";
        this.value = value;
    }
    public repr() {
        return this.value;
    }
    public display() {
        return this.value.toString();
    }
    public increment() {
        this.value += 1;
    }
    public decrement() {
        this.value -= 1;
    }
    public concat(other:NumberObj) {
        this.value = parseInt(this.value.toString() + other.value.toString());
    }
    public index(other:NumberObj) {
        if(other.value < 0) {
            return new NumberObj(-1);
        }
        else if(other.value < this.value) {
            return new NumberObj(1)
        }
        else {
            return new NumberObj(0);
        }
    }
    public insert(key:NumberObj, other:NumberObj) {
        this.value += other.value;
    }
    public add(other:NumberObj) {
        return new NumberObj(this.value + other.value);
    }
    public subtract(other:NumberObj) {
        return new NumberObj(this.value - other.value);
    }
    public multiply(other:NumberObj) {
        return new NumberObj(this.value * other.value);
    }
    public divide(other:NumberObj) {
        if(other.value === 0) {
            return new NumberObj(this.value);
        }
        else {
            return new NumberObj(this.value / other.value);
        }
    }
    public remainder(other:NumberObj) {
        return new NumberObj(this.value % other.value);
    }
    public power(other:NumberObj) {
        return new NumberObj(Math.pow(this.value, other.value));
    }
    public addassign(other:NumberObj) {
        this.value += other.value;
    }
    public subassign(other:NumberObj) {
        this.value -= other.value;
    }
    public multiplyassign(other:NumberObj) {
        this.value *= other.value;
    }
    public divideassign(other:NumberObj) {
        if(other.value === 0) {
            this.value += 0;
        }
        else {
            this.value /= other.value;
        }
    }
    public remainderassign(other:NumberObj) {
        this.value %= other.value;
    }
    public setitem(key:NumberObj, other:NumberObj) {
        this.value += other.value - 1;
    }
    public append(other:NumberObj) {
        this.value += other.value;
    }
    public pop() {
        this.value -= 1;
        if(this.value >= 0) return new NumberObj(1);
        else return new NumberObj(-1);
    }
    public remove(key:NumberObj) {
        this.value -= 1;
    }
    public count(other:NumberObj) {
        if (other.value === 0) {
            return new NumberObj(0);
        }
        else {
            return new NumberObj(Math.floor(this.value / other.value));
        }
    }
    public length() {
        return new NumberObj(this.value.toString().length);
    }
    //returns a boolean, must be updated to return a bool object
    public contains(other:NumberObj) {
        return other.value < this.value;
    }

}

class StringObj implements Obj {
    public value:string[];
    public type:string;

    constructor(value:any) {
        this.type = "string";
        this.value = value.split("");
    }
    public repr() {
        return this.value.join("");
    }
    public display() {
        return '"' + this.value.join("") + '"';
    }
    public length() {
        return new NumberObj(this.value.length);
    }
    public concat(other:StringObj) {
        this.value = this.value.concat(other.value);
    }
    //adds a space to end of string
    public increment() {
        this.value = this.value.concat([" "]);
    }
    public decrement() {
        this.value.pop();
    }
    public index(key:NumberObj) {
        return new StringObj(this.value[key.value]);
    }
    public insert(key:NumberObj, other:StringObj) {
        if (key.value >= 0 && key.value < this.value.length) {
            for(var i=0;i<other.value.length;i++) {
                this.value.splice(key.value, 0, other.value[i]);
            }
        }
        else {
            //if index is out of bounds, will set at zero position
            for(var i=0;i<other.value.length;i++) {
                this.value.splice(0, 0, other.value[i]);
            }
        }
    }
    //destructive version of insert method for strings.
    public setitem(key:NumberObj, other:StringObj) {
        if (key.value >= 0 && key.value < this.value.length) {
            this.value.splice(key.value, 1);
            for(var i=0;i<other.value.length;i++) {
                this.value.splice(key.value, 0, other.value[i]);
            }
        }
        else {
            this.value.splice(0, 1);
            //if index is out of bounds, will set at zero position
            for(var i=0;i<other.value.length;i++) {
                this.value.splice(0, 0, other.value[i]);
            }
        }
    }
    public add(other:StringObj) {
        return new StringObj(this.value.join("") + other.value.join(""));
    }
    public append(other:StringObj) {
        this.value = this.value.concat(other.value);
    }
    public pop() {
        return new StringObj(this.value[this.value.length]);
    }
    public remove(key:StringObj) {
        this.value = this.value.join("").replace(key.repr(), "").split("");
    }
    public count(other:StringObj) {
        var count = 0;
        var tempstring = this.value.join("")
        while(tempstring.search(other.repr()) !== -1) {
            count += 1;
            tempstring = tempstring.replace(other.repr(), "");
        }
        return new NumberObj(count);
    }
    public contains(other:StringObj) {
        return new BoolObj(this.repr().search(other.repr()) !== -1);
    }
    public subtract(other:StringObj) {
        return new StringObj(this.value.join("").replace(other.repr(), ""));
    }
    public multiply(other:StringObj) {
        var count = other.value.length;
        var newstr = new StringObj(this.repr());
        for(var i=0;i<count;i++) {
            newstr.append(other);
        }
        return newstr;
    }
    //produces a repeat string object of the sum of both strings lengths attributes
    public power(other:StringObj) {
        var newlength = this.value.length + other.value.length;
        var newstr = new StringObj("");
        for(var i=0;i<newlength;i++) {
            newstr.append(this);
            newstr.append(other);
        }
        return newstr;
    }
    //returns a string split by the other string as the delimeter
    public divide(other:StringObj) {
        return new StringObj(this.repr().split(other.repr()));
    }
    //remove all oeprator for strings
    public remainder(other:StringObj) {
        var patt = new RegExp(other.repr(), "g");
        return new StringObj(this.value.join("").replace(patt, ""));
    }
    public addassign(other:StringObj) {
        this.append(other);
    }
    public subassign(other:StringObj) {
        this.value = this.value.join("").replace(other.repr(), "").split("");
    }
    public multiplyassign(other:StringObj) {
        var count = other.value.length;
        for(var i=0;i<count;i++) {
            this.append(other);
        }
    }
    public divideassign(other:StringObj) {
        this.value = this.repr().split(other.repr());
    }
    public remainderassign(other:StringObj) {
        var patt = new RegExp(other.repr(), "g");
        this.value = this.value.join("").replace(patt, "").split("");
    }
}
//range object
class RangeObj {

    public type:string;
    public start:NumberObj;
    public end:NumberObj;

    constructor(start:NumberObj, end:NumberObj) {
        this.type = "range";
        this.start = start;
        this.end = end;
    }
    //returns an object containing the start and end points of the range
    public repr() {
        return {end:this.end.repr(), start:this.start.repr()};
    }
    public display() {
        return this.start.display() + "<-->" + this.end.display();
    }
    public increment() {
        this.start.value += 1;
        this.end.value += 1;
    }
    public decrement() {
        this.start.value -= 1;
        this.end.value -=1;
    }

    public concat(other:RangeObj) {

    }
    public index(other:NumberObj) {

    }

}

class ListObj implements Obj {

    public value:any[];
    public type:string;

    constructor() {
        this.value = [];
        this.type = "list";
    }
    public repr() {
        return this.value;
    }
    public display() {
        return JSON.stringify(this.value);
    }
    public increment() {
        this.value.push(new NothingObj());
    }
    public decrement() {
        this.value.pop();
    }
    public concat(other:ListObj) {
        this.value = this.value.concat(other.value);
    }
    public index(key:NumberObj) {
        var ind = key.value % this.value.length;
        return this.value[ind];
    }
    public setitem(key:NumberObj, other:any) {
        if(key.value >= 0 && key.value < this.value.length) {
            this.value[key.value] = other;
        }
        else if(key.value < 0) {
            this.value[0] = other;
        }
        else {
            this.value[this.value.length-1] = other;
        }
    }
    public append(other:any) {
        this.value.push(other);
    }
    public pop() {
        return this.value.pop();
    }
    public remove(key:NumberObj) {
        var ind = key.value % this.value.length-1;
        this.value.splice(ind, 1);
    }
    public count(other:any) {
        var total = 0;
        for(var i=0;i<this.value.length;i++) {
            if (this.value[i] === other) {
                total += 1;
            }
        }
        return new NumberObj(total);
    }
    //linear search
    public contains(other:any) {
        var contain = false;
        for(var i=0;i<this.value.length;i++) {
            if(this.value[i] === other) {
                return new BoolObj(true);
            }
        }
        return new BoolObj(contain);
    }
    public length() {
        return new NumberObj(this.value.length);
    }
    public insert(key:NumberObj, other:any) {
        var ind = key.value % this.value.length;
        this.value.splice(ind, 0, other);
    }
    public add(other:ListObj) {
        var newlist = new ListObj();
        newlist.value = this.value.concat(other.value);
        return newlist;
    }
    //subtracts all items in one list, from the other list
    public subtract(other:ListObj) {
        var newlist = new ListObj();
        for(var i=0;i<this.value.length;i++) {
            for(var j=0;j<other.value.length;j++) {
                if(this.value[i] === other.value[j]) {
                    newlist.append(other.value[i]);
                }
            }
        }
        return newlist;
    }
    public multiply(other:ListObj) {
        var newlist = new ListObj();
        for(var i=0;i<other.value.length;i++) newlist.value = this.value.concat(other.value);
        return newlist;
    }
    //future implementation
    public divide(other:ListObj) {
        return this;
    }
    //future implementation
    public remainder(other:ListObj) {
        return this;
    }
    public power(other:ListObj) {
        return this;
    }
    public addasign(other:ListObj) {
        this.append(other);
    }
}

class SetObj {

}

class MapObj {

}

class BoolObj {
    public state:Boolean;
    public type:String;

    constructor(state:Boolean) {
        this.state = state;
        this.type = "Bool";
    }
    public repr() {
        return this.state;
    }
}
//implements the nothing type
class NothingObj {
    public type:String;

    constructor() {
        this.type = "nothing"
    }

    public repr() {
        return this;
    }

    public display() {
        return this.type;
    }
}