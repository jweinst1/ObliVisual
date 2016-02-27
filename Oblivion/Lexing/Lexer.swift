//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//main file to implement a lexer

class TokenMethods {
    //determines if string is a number
    static func isNumber(input:String) ->Bool {
        let charset = Set(input.characters)
        return charset.isSubsetOf(CharLib.numset)
    }
    //determines if string is a word
    static func isWord(input:String) ->Bool {
        let charset = Set(input.lowercaseString.characters)
        return charset.isSubsetOf(CharLib.letterset)
    }
    //checks if token is a math operator
    static func isMath(input:String) ->Bool {
        let charset = Set(input.lowercaseString.characters)
        return charset.isSubsetOf(CharLib.mathopset)
    }
}
//lexes the new tokens
class Lexer {
    var mode:Bool

    init() {
        self.mode = true
    }

    func LexTokens(tokens:[token]) -> Void {
        for elem in tokens {
            if TokenMethods.isMath(elem.symbol) {
                elem.setlabel("math")
            }
            else if TokenMethods.isNumber(elem.symbol) {
                elem.setlabel("number")
            }
            else {
                elem.setlabel("ERROR")
            }
        }
    }
}