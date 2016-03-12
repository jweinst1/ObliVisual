//
// Created by Joshua Weinstein on 3/9/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//determines structure of string tokens
struct LexerMethods {
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
    //determines if string is an oper
    static func isOper(input:String) ->Bool {
        return OperTokens.all.contains(input)
    }

    static func isContainer(input:String) ->Bool {
        return OperTokens.containers.contains(input)
    }

    static func isString(input:String) ->Bool {
        return input.matchPattern("^\\`[^`]*\\`$")
    }

}
