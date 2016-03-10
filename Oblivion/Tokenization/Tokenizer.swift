//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation




//main tokenizer class for Oblivion
struct Tokenizer {

    static func Tokenize(line:String) -> [Token] {
        let fragments = line.matchesForRegexInText(TokenPatterns.alltokens)
        var newtokens = [Token]()
        for elem in fragments {
            newtokens.append(Token(element:elem))
        }
        return newtokens

    }
}