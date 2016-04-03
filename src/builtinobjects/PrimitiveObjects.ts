//typescript version of built in objects

interface Obj {
    value:any;
    type:string;
    repr():any;
    increment():void;
    decrement():void;
    concat(other:any):void;
    index(key:any):any;
    setitem(key:any, other:any):void;
    append(other:any):void;
    pop():any;
    remove(key:any):void;
    count(other:any):any;
    length():any;

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

}

class StringObj implements Obj {
    public value:number;
    public type:string;

    constructor(value:any) {
        this.type = "string";
        this.value = value;
    }
    public repr() {
        return this.value;
    }
    public concat(other:StringObj) {
        this.value += other.value;
    }
}

class ListObj {

}

class SetObj {

}

class MapObj {

}