/**
 * Created by Josh on 3/26/16.
 */
//file that contains error checking function for arguments and statement types.
var bip = require("./builtinobjects/BuiltInPrimitive.js");
var checkargs = function(statement, args) {
    switch(statement) {
        case "[addition]":
            return checkfornumbers(args);
            break;
        case "[subtraction]":
            return checkfornumbers(args);
            break;
        case "[multiplication]":
            return checkfornumbers(args);
            break;
        case "[division]":
            return checkfornumbers(args);
            break;
        case "[strconcat]":
            return checkforstrs(args);
            break;
        default:
            return false;
    }
};

//exports the function that uses all other error functions
exports.checkargs = checkargs;

//checks number arguments
var checkfornumbers = function(args) {
    for(var key in args) {
        if(args[key].constructor !== bip.NumberObj) {
            return true;
        }
    }
    return false;
};

var checkforstrs = function(strs) {
    for(var key in args) {
        if(args[key].constructor !== bip.StringObj) {
            return true;
        }
    }
    return false;
};