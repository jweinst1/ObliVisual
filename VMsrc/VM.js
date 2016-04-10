/**
 * Created by Josh on 4/9/16.
 */
//functions stored in object for quick access
//all must be calld with an instance of the VM, Oblivion
var Assembler = {
    "+":function(args, obj) {
        for(var key in args) obj.current += args[key];
    },
    "@":function(args, obj) {
        obj.current = args[0];
    }
};





//main VM class
var Oblivion = (function(){
    function Oblivion() {
        this.current = null;
        this.assembler = Assembler;
    }
    //main splitting function
    Oblivion.prototype.splitfunc = function(string) {
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
    Oblivion.prototype.typeinfer = function(tokens) {
        for(var i=0;i<tokens.length;i++) {
            if(/[0-9]|[1-9][0-9]+/.test(tokens[i])) {
                tokens[i] = parseInt(tokens[i]);
            }
            else if(/".*?"/.test(token)) {
                tokens[i] = tokens[i].slice(1, token.length-1);
            }
            else {
                throw "Token Error, at expression: " + token;

            }
        }
    };
    Oblivion.prototype.process = function(code) {
        var pieces = this.splitfunc(code);
        for(var i=0;i<pieces.length;i++) {
            var calltype = pieces[i].shift();
            this.typeinfer(pieces[i]);
            this.assembler[calltype](pieces[i], this);
        }
        var result = this.current;
        this.current = null;
        return result;
    };
    return Oblivion;
})();
