var bip = require("./builtinobjects/BuiltInPrimitive.js");
//file for infering types.


//parses types in tokens
var ParseType = function(token, vardict) {
    if (/^[0-9]+$/.test(token)) return new bip.NumberObj(parseInt(token));
    else if (token[0] === '"' && token[token.length-1] === '"') {
        return new bip.StringObj(token.slice(1, token.length-1));
    }
    else if(token === "[]") {
        return new bip.ListObj();
    }
    else if(/^\@[a-zA-Z]+$/.test(token)) {
        token = token.slice(0, token.length);
        if(vardict.check(token)) {
            var retrieve = vardict.get(token);
            retrieve["name"] = token;
            return retrieve;
        }
        else {
            return new bip.NameObj(token);
        }
    }
};

exports.ParseType = ParseType;