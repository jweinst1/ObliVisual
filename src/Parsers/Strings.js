/**
 * Created by Josh on 3/30/16.
 */

//takes two strings and concats them with a space if they represent a spaced string.
var StringBuilder = (function(){
    function StringBuilder(){
    }
    StringBuilder.parse = function(str1, str2) {
        try {
            if(str1[0] !== '"' && str1[str1.length-1] === '"') {
                if(str2[0] !== '"' && str2[str2.length-1] !== '"') {
                    return str2 + " " + str1;
                }
                else if(str2[0] === '"' && str2[str2.length-1] !== '"') {
                    return str2 + " " + str1;
                }
                else throw err;
            }
            else throw err;
        }
        catch(err) {
            console.log("String Error");
        }
    };
    //checks if parsing needs to begin on argument stack
    StringBuilder.check = function(str) {
        return str[0] !== '"' && str[str.length-1] === '"';
    };

    return StringBuilder;
})();

exports.StringBuilder = StringBuilder;