//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation




//main tokenizer class for Oblivion
struct Tokenizer {
    static func Tokenize(line:String, mode:Character="n") -> [String] {
        var splits = line.componentsSeparatedByString(" ")
        if mode == "n" {
            return splits
        }
        else {
            return splits
        }
    }
}