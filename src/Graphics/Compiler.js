/**
 * Main compiler file
 */
var ftemp = require("./FileTemplates.js");
var line = require("./Linetools.js");

var Compile = (function(){
    function Compile(){

    }
    Compile.compileToHTML = function(code) {
        var htmltemp = new ftemp.ScriptWriter();
        var compiled = line.LineTool.drawlines(code);
        htmltemp.concatcmds(compiled);
        return htmltemp.getHTMLline();
    };
    return Compile;
})();

exports.Compile = Compile;


