/**
 * Created by Josh on 3/20/16.
 */

//utils file

    //gets a single key in an obj
var GetSingleKey = function(obj) {
    for(var key in obj) var label = key;
    return label;
};

exports.GetSingleKey = GetSingleKey;