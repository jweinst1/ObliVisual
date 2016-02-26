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
}

class Lexer {
    var mode:Bool

    init() {
        self.mode = true
    }

    func LexTokens(tokens:[token]) -> [token] {

    }
}