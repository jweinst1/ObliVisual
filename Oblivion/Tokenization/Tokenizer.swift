//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//token struct
struct token {
    var label:String
    var symbol:String

    init(symbol:String, label:String) {
        self.symbol = symbol
        self.label = label
    }
    //sets label of token
    mutating func setlabel(label:String) {
        self.label = label
    }
    //changes symbol value to integer

    func getlabel() -> String {
        return self.label
    }
}

struct CharLib {
    //static sets to check for patterns without regex
    static var numset = Set("0123456789".characters)
    static var letterset = Set("abcdefghijklmnopqrstuvwxyz".characters)
    static var mathopset = Set("+-*/%".characters)
}

//main tokenizer class for Oblivion
class Tokenizer {
    static func Tokenize(line:String) ->[token] {
        let splits = line.componentsSeparatedByString(" ")
        var toks = [token]()
        for elem in splits {
            toks.append(token(symbol:elem, label:"NAN"))
        }
        return toks
    }

}