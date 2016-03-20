/**
 * Created by Josh on 3/20/16.
 */
//file for infering types.


//parses types in tokens
var ParseType = function(token) {
    if (/[0-9]+/.test(token)) return parseInt(token);
    else if (/^".*?"$/.test(token)) {
        return token.slice(1, token.length-1)
    }
};

exports.ParseType = ParseType;