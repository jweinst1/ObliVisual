//
// Created by Joshua Weinstein on 2/25/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//Main Interpreter object for the Oblivion language
class Interpreter {
    var log:[String]
    var lexer:Lexer
    var tokenizer:Tokenizer

    init() {
        self.log = [String]()
        self.lexer = Lexer()
        self.tokenizer = Tokenizer
    }

    mutating func processline(line:String) {
        var toks = self.tokenizer.Tokenize(line)
        self.lexer.LexTokens(toks)
    }
}
