/**
 * Created by Josh on 4/19/16.
 * Contains Primitive Objects
 */


var NumberObj = (function(){
    function NumberObj(value){
        this.value = value;
        this.type = "number";
    }
    NumberObj.prototype.repr = function() {
        return this.value;
    };
    NumberObj.prototype.display = function() {
        return this.value;
    };
    return NumberObj;
})();

exports.NumberObj = NumberObj;


//strings are implemented as collection types
var StringObj = (function(){
    function StringObj(value){
        this.value = value.split("");
        this.type = "string";
    }
    StringObj.prototype.repr = function() {
        return this.value;
    };
    StringObj.prototype.display = function() {
        return '"' + this.value.join("") + '"';
    };
    StringObj.prototype.pop = function() {
        var last = this.value[this.value.length-1];
        this.value = this.value.slice(0, this.value.length-1);
        return last;
    };
    return StringObj;
})();

exports.StringObj = StringObj;

var ListObj = (function(){
    function ListObj(){
        this.value = [];
        this.type = "list";
    }
    ListObj.prototype.repr = function() {
        return this.value;
    };
    ListObj.prototype.display = function() {
        var displayed = [];
        for(var key in this.value) {
            displayed.push(this.value[key].display());
        }
        return displayed;
    };
    ListObj.prototype.append = function(elem) {
        this.value.push(elem);
    };
    ListObj.prototype.pop = function() {
        return this.value.pop();
    };
    return ListObj;
})();

exports.ListObj = ListObj;

var SetObj = (function(){
    function SetObj(){
        this.value = {};
        this.type = "set";
    }
    SetObj.prototype.repr = function() {
        return this.value;
    };
    SetObj.prototype.display = function() {
        return JSON.stringify(this.value);
    };
    SetObj.prototype.add = function(elem) {
        this.value[JSON.stringify(elem)] = true;
    };
    SetObj.prototype.contains = function(elem) {
        return new BoolObj(JSON.stringify(elem) in this.value);
    };
    SetObj.prototype.delete = function(elem) {
        delete this.value[JSON.stringify(elem)];
    };
    return SetObj;
})();

exports.SetObj = SetObj;

var ErrorObj = (function(){
    function ErrorObj(value){
        this.value = value;
        this.type = "error";
    }
    ErrorObj.prototype.repr = function() {
        return this.value;
    };
    ErrorObj.prototype.display = function() {
        return this.value;
    };
    return ErrorObj;
})();

exports.ErrorObj = ErrorObj;

var BoolObj = (function(){
    function BoolObj(value){
        this.value = value;
        this.type = "bool";
    }
    BoolObj.prototype.repr = function() {
        return this.value;
    };
    BoolObj.prototype.display = function() {
        return JSON.stringify(this.value);
    };
    return BoolObj;
})();

exports.BoolObj = BoolObj;

/*
* The Array object is a fixed size, stick of storage.
* */

var ArrayObj = (function(){
    function ArrayObj(size){
        this.size = size;
        this.value = [];
        this.type = "array";
        for(var i=0;i<this.size;i++) {
            this.value.push(false);
        }
    }
    ArrayObj.prototype.repr = function(){
        return this.value;
    };
    ArrayObj.prototype.display = function() {
        var displayed = [];
        for(var key in this.value) {
            displayed.push(this.value[key].display());
        }
        return displayed;
    };
    ArrayObj.prototype.get = function(num){
        return this.value[num];
    };
    ArrayObj.prototype.set = function(num, elem) {
        if(num >= 0 && num < this.size) {
            this.value[num] = elem;
        }
    };
    return ArrayObj;
})();

exports.ArrayObj = ArrayObj;

//miniature version of a call on an object, however no return statements are used.
var Process = (function() {
    var operations = {
        "+":function(arg, operand){
            if(arg.type === "number") {
                arg.value += operand.value;
            }
            else if(arg.type === "string" && operand.type === "string") {
                arg.value += operand.value;
            }
        },
        "-":function(arg, operand){
            if(arg.type === "number") {
                arg.value -= operand.value;
            }
        },
        "*":function(arg, operand){
            if(arg.type === "number") {
                arg.value *= operand.value;
            }
        },
        "/":function(arg, operand){
            if(arg.type === "number") {
                arg.value /= operand.value;
                if(!isFinite(arg.value)) {
                    arg.value = 0;
                }
            }
        }
    };
    function Process(oper, operand) {
        this.oper = oper;
        this.type = "process";
        this.operand = operand;
        this.func = operations[this.oper];
    }
    Process.prototype.call = function(element) {
        this.func(element, this.operand);
    };
    Process.prototype.display = function(){
        return "!(" + this.oper + " -> " + this.operand.display() + ")";
    };
    return Process;
})();

exports.Process = Process;

var Name = (function(){
    function Name(name){
        this.name = name;
        this.type = "name";
    }
    Name.prototype.repr = function() {
        return this.name;
    };
    Name.prototype.display = function() {
        return this.name;
    };
    return Name;
})();

exports.Name = Name;

//condition object is used to call things that determine true or false states.

var Condition = (function(){
    var operations = {
        //uses absolute string comparisons for fast logical evaluation.
        "==":function(arg, operand) {
            var result;
            JSON.stringify(arg) === JSON.stringify(operand) ? result = new BoolObj(true): result = new BoolObj(false);
            return result;
        },
        //not equal oper for condition
        "!=":function(arg, operand) {
            var result;
            JSON.stringify(arg) !== JSON.stringify(operand) ? result = new BoolObj(true): result = new BoolObj(false);
            return result;
        },
        ">":function(arg, operand) {
            var result;
            if(arg.type === "number" && operand.type === "number") {
                arg.value > operand.value ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "string" && operand.type === "string") {
                arg.value.length > operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "list" && operand.type === "list") {
                arg.value.length > operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
        },
        "<":function(arg, operand) {
            var result;
            if(arg.type === "number" && operand.type === "number") {
                arg.value < operand.value ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "string" && operand.type === "string") {
                arg.value.length < operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "list" && operand.type === "list") {
                arg.value.length < operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
        },
        ">=":function(arg, operand) {
            var result;
            if(arg.type === "number" && operand.type === "number") {
                arg.value >= operand.value ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "string" && operand.type === "string") {
                arg.value.length >= operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "list" && operand.type === "list") {
                arg.value.length >= operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
        },
        "<=":function(arg, operand) {
            var result;
            if(arg.type === "number" && operand.type === "number") {
                arg.value <= operand.value ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "string" && operand.type === "string") {
                arg.value.length <= operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
            else if(arg.type === "list" && operand.type === "list") {
                arg.value.length <= operand.value.length ? result = new BoolObj(true): result = new BoolObj(false);
                return result;
            }
        }
    };
    function Condition(oper, operand){
        this.oper = oper;
        this.operand = operand;
        this.type = "condition";
        this.func = operations[this.oper];
    }
    Condition.prototype.call = function(element) {
        return this.func(element, this.operand);
    };
    Condition.prototype.display = function(){
        return "?(" + this.oper + " -> " + this.operand.display() + ")";
    };
    return Condition;
})();

exports.Condition = Condition;

/*Special conidition, that if true, calls one process, and if false, calls a different process.
These can be chained, to fire through streams of conditionals, to achieve the right process.
* */

var ConditionalProcess = (function(){
    function ConditionalProcess(cond, proc, altproc){
        this.cond = cond;
        this.proc = proc;
        this.altproc = altproc;
        this.type = "condproc";
    }
    ConditionalProcess.prototype.display = function(){
        return "!{" + this.cond.display() + " :: " + this.proc.display() + " :: " + this.altproc.display() + "}";
    };
    ConditionalProcess.prototype.call = function(elem) {
        var result = this.cond.call(elem);
        if(result.type === "bool" && result.value === true) {
            this.proc.call(elem);
        }
        else {
            this.altproc.call(elem);
        }
    };
    return ConditionalProcess;
})();

exports.ConditionalProcess = ConditionalProcess;