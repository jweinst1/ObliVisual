//typescript version of built in objects

interface Obj {
    value:any;
    type:string;
    repr():any;
    increment():void;
    decrement():void;
    concat(other:any):void;
    index(key:any):any;
    add(other:any):any;
    subtract(other:any):any;
    multiply(other:any):any;
    divide(other:any):any;
    remainder(other:any):any;
    addassign(other:any):void;
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
    public addassign(other:NumberObj) {
        this.value += other.value;
    }
}

class StringObj {

}

class ListObj {

}

class SetObj {

}

class MapObj {

}