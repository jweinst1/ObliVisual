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
        return JSON.stringify(this.value);
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





