/**
 * Assembler for writing lineTo() commands
 * These deal with called commands like ">" or "_" for right and down
 * Neither x or y coordinates can ever go below zero
 */

var LinePathASM = {
    "begin":function(){
        return "ctx.beginPath();";
    },
    ">":function(x, y, amount) {
        x += amount;
        return "ctx.lineTo(" + x + "," + y + ");";
    },
    "<":function(x, y, amount) {
        x -= amount;
        if(x < 0) x = 0;
        return "ctx.lineTo(" + x + "," + y + ");";
    },
    "^":function(x, y, amount) {
        y += amount;
        return "ctx.lineTo(" + x + "," + y + ");";
    },
    "_":function(x, y, amount) {
        y -= amount;
        if(y < 0) y = 0;
        return "ctx.lineTo(" + x + "," + y + ");";
    }

};

var LineTool = (function(){
    var Point = function(x, y){
        this.x = x;
        this.y = y;
    };
    var LinePathASM = {
        "begin":function(){
            return "ctx.beginPath();";
        },
        "stroke":function(){
            return "ctx.stroke();";
        },
        ">":function(obj, amount) {
            obj.x += amount;
            return "ctx.lineTo(" + obj.x + "," + obj.y + ");";
        },
        "<":function(obj, amount) {
            obj.x -= amount;
            if(obj.x < 0) obj.x = 0;
            return "ctx.lineTo(" + obj.x + "," + obj.y + ");";
        },
        "^":function(obj, amount) {
            obj.y += amount;
            return "ctx.lineTo(" + obj.x + "," + obj.y + ");";
        },
        "_":function(obj, amount) {
            obj.y -= amount;
            if(obj.y < 0) obj.y = 0;
            return "ctx.lineTo(" + obj.x + "," + obj.y + ");";
        }

    };
    function LineTool(){
    }
    LineTool.drawlines = function(code, x, y, thick) {
        //defaults to zero if unspecified
        x = x || 0;
        y = y || 0;
        var pos = new Point(x, y);
        thick = thick || 2;
        var strokes = [];
        strokes.push("ctx.lineWidth = " +thick+ ";");
        strokes.push(LinePathASM["begin"]());
        var pieces = code.split(",");
        for(var i=0;i<pieces.length-1;i+=2) {
            var linelength = parseInt(pieces[i+1]);
            strokes.push(LinePathASM[pieces[i]](pos, linelength));
        }
        return strokes;
    };
    return LineTool;
})();

console.log(LineTool.drawlines(">,4,^,6,>,8"));

