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
    function ListObj(value){
        this.value = value;
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