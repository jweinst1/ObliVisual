//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation




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