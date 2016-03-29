/**
 * Created by Josh on 3/24/16.
 */

//functions as overloaded object wrapper to store variables and objects.
var VariableDict = function() {
    VariableDict.prototype.set = function(name, obj) {
        this[name] = obj;
    };
    VariableDict.prototype.get = function(name) {
        return this[name];
    };
    VariableDict.prototype.check = function(name) {
        return name in this;
    };
    VariableDict.prototype.del = function(name) {
        if(name in this) delete this[name];
    };
};

exports.VariableDict = VariableDict;