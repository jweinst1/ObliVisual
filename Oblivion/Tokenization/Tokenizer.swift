//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation




//main tokenizer class for Oblivion
struct Tokenizer {
    static let tokenpat = "\\(|\\)|\\[|\\]|\\.|\\@|[a-zA-Z]+|[0-9]+|<-"
    static func Tokenize(line:String, mode:Character="n") -> [String] {
        return line.matchesForRegexInText(Tokenizer.tokenpat)
    }
}