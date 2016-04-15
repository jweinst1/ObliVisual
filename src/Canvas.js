/**
 * Created by Josh on 4/14/16.
 */
var canvas = function(name) {
    this.canvas = document.getElementById(name);
    this.context = this.canvas.getContext("2d");
};

var Canvas = (function(){
    function Canvas(name, height, width){
        this.canvas = document.getElementById(name);
        this.context = this.canvas.getContext("2d");
        this.height = height;
        this.width = width;
        this.x = 0;
        this.y = 0;
    }
    //splits the drawing code format ;command:amount;
    Canvas.prototype.splitfunc = function(string) {
        if(/;.+;/.test(string)) {
            var tokens = string.slice(1, string.length-1).split(";");
            for(var i=0;i<tokens.length;i++) {
                tokens[i] = tokens[i].split(":");
            }
            return tokens;
        }
        else {
            //returns false if string is invalid assembly language
            return false;
        }
    };
    Canvas.prototype.codeDraw = function(code, color, thickness) {
        color = color || "rgb(0,0,0)";
        thickness = thickness || 1;
        this.context.lineWidth = thickness;
        this.context.strokeStyle = color;
        var fragments = this.splitfunc(code);
        for(var i=0;i<fragments.length;i++) {
            var amount = parseInt(fragments[i][1]);
            if(NaN(amount)) throw "Invalid Number in Code";
            switch (fragments[i][0]) {
                case ">":
                    break;
                default:
                    this.x += 0;
                    this.y += 0;
            }
        }

    };
    return Canvas
})();

exports.Canvas = Canvas;



