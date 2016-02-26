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
}

class TokenMethods {
    
    static func isNumber(input:String) {
        
    }
}


