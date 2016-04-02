//typescript version of built in objects

interface Obj {
    value:any;
    type:string;
    increment(amount:any):void;

}

class NumberObj implements Obj {
    public value:number;
    public type:string;

    constructor(value:any) {
        this.type = "number";
        this.value = value;
    }
    public increment(amount:NumberObj) {
        this.value += amount.value;
    }
}