/**
 * file that contains templates for Filestrings
 */

    //{{script}} is for transcompilation to be inserted
var HTMLblank = function(){
    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body><script>{{script}}</script></body></html>';
};


exports.HTMLblank = HTMLblank;

var ScriptWriter = (function(){
    function ScriptWriter(){
        //default code to create the canvas object
        this.commands = ["var canvas = document.createElement('canvas');",
            'canvas.id = "main";',
        "canvas.width  = window.innerWidth;",
        "canvas.height = window.innerHeight;",
        "canvas.style.zIndex   = 8;",
        'canvas.style.position = "absolute";',
        "document.body.appendChild(canvas);",
        'var ctx = canvas.getContext("2d");'];
        this.contextname = "ctx";
    }
    ScriptWriter.prototype.getHTMLline = function() {
        return HTMLblank().replace("{{script}}", this.commands.join(" "));
    };
    ScriptWriter.prototype.addcmd = function(command) {
        this.commands.push(command);
    };
    ScriptWriter.prototype.lastcmd = function() {
        return this.commands[this.commands.length-1];
    };
    ScriptWriter.prototype.stroke = function() {
        this.commands.push("ctx.stroke();");
    };
    ScriptWriter.prototype.concatcmds = function(arr) {
        this.commands = this.commands.concat(arr);
    };
    ScriptWriter.prototype.linethick = function(amount) {
        this.commands.push("ctx.lineWidth =" +amount+ ";");
    };
    return ScriptWriter;
})();

exports.ScriptWriter = ScriptWriter;


