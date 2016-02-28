//
// Created by Joshua Weinstein on 2/25/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//Main Interpreter object for the Oblivion language
//can tokenize, read and parse commands from an input line all at once
class Interpreter {

    var istack:IntStack
    var mode:String

    init() {
        self.istack = IntStack()
        self.mode = "math"
    }

    func parseline(line:String) ->Void {
        let tokens = line.componentsSeparatedByString(" ")
        for(var i=tokens.count-1;i>=0;i--) {
            if TokenMethods.isNumber(tokens[i]) {
                self.istack.push(Int(tokens[i])!)
            }
            switch(tokens[i]) {
            case "+":
                self.istack.sum()
            case "-":
                self.istack.minus()
            case "*":
                self.istack.mul()
            case "p":
                print(self.istack.getlast())
            default: break


            }
        }
        self.istack.pull()
    }
}
