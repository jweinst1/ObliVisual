//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation
//main file for the Parser class


class Parser {
    var currentstack:ArgStack<Int>

    init() {
        self.currentstack = ArgStack()
    }
    //main parse function
    func parse(tokens:[String]) -> Void {
        for(var i=tokens.count-1;i>=0;i--) {
            if TokenMethods.isInt(tokens[i]) {
                self.currentstack.push(Int(tokens[i])!)
            }
            else {
                switch(tokens[i]) {
                case "+":
                    MathParser.sum(self.currentstack)
                case "*":
                    MathParser.mul(self.currentstack)
                case "-":
                    MathParser.subtract(self.currentstack)
                case "/":
                    MathParser.div(self.currentstack)
                case "^":
                    MathParser.max(self.currentstack)
                case "_":
                    MathParser.min(self.currentstack)

                default:
                    print("ERR bad token")

                }
            }
        }
        print(self.currentstack.stack.first!)
        self.currentstack.flush()
    }
}

