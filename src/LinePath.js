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

exports.LinePathASM = LinePathASM;

