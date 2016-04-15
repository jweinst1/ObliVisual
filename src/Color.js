/**
 * Created by Josh on 4/14/16.
 */

//color class to control rgb colors and numbers
var RgbColor = (function(){
    function RgbColor(red, blue, green) {
        this.green = green || 0;
        this.blue = blue || 0;
        this.red = red || 0;
    }

    RgbColor.prototype.string = function() {
        return "rgb(" + this.red.toString() + "," + this.green.toString() + "," + this.blue.toString() + ")";
    };
    RgbColor.prototype.setred = function(amount) {
        this.red = amount;
        if(this.red > 255) {
            this.red -= 255;
        }
        else if(this.red < 0) {
            this.red = Math.abs(this.red);
        }
    };
    RgbColor.prototype.setblue = function(amount) {
        this.blue = amount;
        if(this.blue > 255) {
            this.blue -= 255;
        }
        else if(this.blue < 0) {
            this.blue = Math.abs(this.blue);
        }
    };
    RgbColor.prototype.setgreen = function(amount) {
        this.green = amount;
        if(this.green > 255) {
            this.green -= 255;
        }
        else if(this.green < 0) {
            this.green = Math.abs(this.green);
        }
    };
    return RgbColor;
})();

