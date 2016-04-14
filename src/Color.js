/**
 * Created by Josh on 4/14/16.
 */

//color class to control rgb colors and numbers
var rgbColor = (function(){
    function rgbColor(red, blue, green) {
        this.green = green || 0;
        this.blue = blue || 0;
        this.red = red || 0;
    }

    rbgColor.prototype.string = function() {

    };
    return rgbColor;
})();