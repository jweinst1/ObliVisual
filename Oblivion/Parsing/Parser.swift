//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation
//main file for the Parser class


class Parser {
    var mathproc:IntStack

    init() {
        self.mathproc = IntStack()
    }
    //main parse function
    func parse(tokens:[token]) {
        for (var i=tokens.count-1;i>=0;i--) {
            switch(tokens[i].label) {
            case "number":
                self.mathproc.push(Int(tokens[i].symbol)!)
            case "add":
                self.mathproc.sum()
            case "mul":
                self.mathproc.mul()
            case "print":
                print(self.mathproc.getlast())
            default:
                print("ERR")
            }
        }
    }
}

