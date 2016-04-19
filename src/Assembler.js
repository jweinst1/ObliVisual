/**
 * Created by Josh on 4/19/16.
 */
//assembler containing file

var StdAssembler = {
    "+":function(obj, args) {
        var total = args.shift();
        for(var key in args) total.value += args[key].value;
        obj.current = total;
    }
};

exports.StdAssembler = StdAssembler;