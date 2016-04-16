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

    }
    return ScriptWriter;
})();

exports.ScriptWriter = ScriptWriter;
