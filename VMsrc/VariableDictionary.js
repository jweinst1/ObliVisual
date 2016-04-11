/**
 * Created by Josh on 3/24/16.
 */

//functions as overloaded object wrapper to store variables and objects.
var VariableDict = function() {
    VariableDict.prototype.set = function(name, obj) {
        this[JSON.stringify(name)] = obj;
    };
    VariableDict.prototype.get = function(name) {
        return this[JSON.stringify(name)];
    };
    VariableDict.prototype.check = function(name) {
        return JSON.stringify(name) in this;
    };
    VariableDict.prototype.del = function(name) {
        var stringd = JSON.stringify(name);
        if(stringed in this) delete this[stringed];
    };
};

exports.VariableDict = VariableDict;