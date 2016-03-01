//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//main file to implement a lexer

class TokenMethods {
    //determines if string is a number
    static func isInt(input:String) ->Bool {
        let charset = Set(input.characters)
        return charset.isSubsetOf(CharLib.intset)
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

    static func isListEnd(input:String) ->Bool {
        return input.characters.last == "]"
    }

    static func isListStart(input:String) ->Bool {
        return input.characters.first == "["
    }

    static func ismath(input:String) -> Bool {
        if OperTokens.math.contains(input) {
            return true
        }
    }

}
//lexes the new tokens
class Lexer {
    var mode:Bool

    init() {
        self.mode = true
    }

    func LexToken(token:String) -> String {
        if TokenMethods.isNumber(token) {
            return "int"
        }
    }
}