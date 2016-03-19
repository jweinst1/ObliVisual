/**
 * Created by Josh on 3/18/16.
 */

    //assembles math statements
var MathAssembler = {
    add:function(numbers) {
        var total = 0
        for (elem in numbers) {
            total += numbers[elem]
        }
        return total
    }
};

