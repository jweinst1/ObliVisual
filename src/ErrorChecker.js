/**
 * Created by Josh on 3/26/16.
 */
//file that contains error checking function for arguments and statement types.

var checkargs = function(statement, args) {
    switch(statement) {
        default:
            for(var key in args) if(agrs[key].constructor===ErrorObj) return true;
    }
};