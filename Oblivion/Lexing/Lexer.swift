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

    static func isListEnd(input:String) ->Bool {
        return input.characters.last == "]"
    }

    static func isListStart(input:String) ->Bool {
        return input.characters.first == "["
    }

}
//lexes the new tokens
class Lexer {
    var mode:Bool

    init() {
        self.mode = true
    }

    func LexTokens(tokens:[token]) -> Void {
        print(tokens.count)
        for (var i=0;i<tokens.count;i++) {
            var elem = tokens[i]
            if TokenMethods.isMath(elem.symbol) {
                switch (elem.symbol) {
                case "+":
                    elem.setlabel("add")
                case "-":
                    elem.setlabel("mul")
                default:
                    elem.setlabel("m")
                }
            }
            else if TokenMethods.isNumber(elem.symbol) {
                elem.setlabel("number")
            }
            else if elem.symbol == "p" {
                elem.setlabel("print")
            }
            else {
                elem.setlabel("ERROR")
            }
        }
    }
}