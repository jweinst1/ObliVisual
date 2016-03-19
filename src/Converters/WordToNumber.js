/**
 * Created by Josh on 3/18/16.
 */
var nums = require("./numberphrases.json");

var toNumber = function(phrase) {
    var words = phrase.split(" ");
    var number = 0;
    for(var i=0;i<words.length;i++) {
        switch(words[i]) {
            case "one":
                number += 1;
                break;
            default:
                continue
        }
    }
};