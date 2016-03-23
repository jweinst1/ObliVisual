//javascript file for handling multiple arguments

var extractargs = function(string) {
    var newstring = string.slice(1, string.length-1);
    return newstring.split(" ");
};

exports.extractargs = extractargs;