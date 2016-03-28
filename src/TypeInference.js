var bip = require("./builtinobjects/BuiltInPrimitive.js");
//file for infering types.


//parses types in tokens
var ParseType = function(token, vardict) {
    if (/[0-9]+/.test(token)) return new bip.NumberObj(parseInt(token));
    else if (/^".*?"$/.test(token)) {
        return new bip.StringObj(token.slice(1, token.length-1));
    }
    else if(/^\@[a-zA-Z]+$/.test(token)) {
        token = token.slice(1, token.length);
        if(vardict.check(token)) return vardict.get(token);
        else {
            return new bip.NameObj(token);
        }
    }
};

exports.ParseType = ParseType;