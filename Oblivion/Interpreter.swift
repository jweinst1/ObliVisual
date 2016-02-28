//
// Created by Joshua Weinstein on 2/25/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//Main Interpreter object for the Oblivion language
class Interpreter {
    var log:[String]
    var lexer:Lexer
    var parser:Parser

    init() {
        self.log = [String]()
        self.lexer = Lexer()
        self.parser = Parser()
    }

    func processline(line:String) {
        self.log.append(line)
        let toks = Tokenizer.Tokenize(line)
        print(toks)
        self.lexer.LexTokens(toks)
        print(toks)
        self.parser.parse(toks)
        print(toks)
    }
}
