/**
 * Created by Josh on 3/26/16.
 */
//file that contains error checking function for arguments and statement types.

var checkargs = function(statement, args) {
    switch(statement) {
        case "[addition]":
            return checkfornumbers(args);
            break;
        case "[subtraction]":
            return checkfornumbers(args);
            break;
        default:
            for(var key in args) if(agrs[key].constructor===ErrorObj) return true;
    }
};

//exports the function that uses all other error functions
exports.checkargs = checkargs;

//checks number arguments
var checkfornumbers = function(args) {
    for(var key in args) {
        if(args[key].constructor !== NumberObj) {
            return true;
        }
    }
    return false;
};