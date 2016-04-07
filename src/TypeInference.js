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
    else if (token === "()") {
        return new bip.SetObj();
    }
    else if (token === "[r]") {
        return new bip.Rift();
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
    //infers the type of list literal of numbers
    else if(/^\[[0-9,]+\]$/.test(token)) {
        token = token.slice(1, token.length-1);
        var splits = token.split(",");
        var newlist = new bip.ListObj();
        for(var i=0;i<splits.length;i++) newlist.append(new bip.NumberObj(parseInt(splits[i])));
        return newlist;
    }
};

exports.ParseType = ParseType;