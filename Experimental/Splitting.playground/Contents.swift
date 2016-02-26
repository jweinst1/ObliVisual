//: Playground - noun: a place where people can play

import Cocoa

//playground to implement splitting methods, as well as tokenization

//token struct
struct token {
    var label:String
    var symbol:String
    
    init(symbol:String, label:String?) {
        self.symbol = symbol
        self.label = label!
    }
}

struct CharLib {
    //de
    static var numset = Set("0123456789".characters)
    static var letterset = Set("abcdefghijklmnopqrstuvwxyz".characters)
}

class TokenMethods {
    //determines if string is a number
    static func isNumber(input:String) ->Bool {
        let charset = Set(input.characters)
        return charset.isSubsetOf(CharLib.numset)
    }
    //determines if string is a word
    static func isWord(input:String) ->Bool {
        let charset = Set(input.characters)
        return charset.isSubsetOf(CharLib.letterset)
    }
}


