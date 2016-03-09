//: Playground - noun: a place where people can play

import Cocoa

struct MathAssembler {
    var current:Int?
    var mode:Character
    
    init(mode:Character) {
        self.mode = mode
    }
    
    func assemble(var tokens:[Any]) -> Int {
        for elem in tokens {
            try {}
        }
        for(var i=1;i<tokens.count-1;i++) {
            if tokens[i] as! String == "+" {
                tokens[i-1] = (tokens[i-1] as! Int) + (tokens[i+1] as! Int)
                tokens.removeAtIndex(i)
                tokens.removeAtIndex(i+1)
            }
        }
        return tokens[0] as! Int
    }
}

var f = "5 + 6 + 7 + 8 + 9".componentsSeparatedByString(" ")
var newtokens = [Any]()
for elem in f{
   newtokens.append(elem)
}
let assm = MathAssembler(mode: "+")

assm.assemble(newtokens)