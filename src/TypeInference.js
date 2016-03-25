/**
 * Created by Josh on 3/20/16.
 */
//file for infering types.


//parses types in tokens
var ParseType = function(token, vardict) {
    if (/[0-9]+/.test(token)) return parseInt(token);
    else if (/^".*?"$/.test(token)) {
        return token.slice(1, token.length-1)
    }
    else if(/^\@[a-zA-Z]+$/.test(token)) {
        return token.slice(1, token.length);
    }
    else if(/^[a-zA-Z]+$/.test(token)) {
        if(vardict.check(token)) return vardict.get(token);
        else {
            //if value not in dict, returns error token
            return "Name Error";
        }
    }
};

exports.ParseType = ParseType;