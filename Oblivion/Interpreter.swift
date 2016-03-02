//
// Created by Joshua Weinstein on 2/25/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//Main Interpreter object for the Oblivion language
//can tokenize, read and parse commands from an input line all at once
class Interpreter {
    var parser:Parser

    init() {
        self.parser = Parser()
    }

    func interpretline(line:String) -> Void {
        let commands = line.componentsSeparatedByString(" ")
        self.parser.parse(commands)
    }
}
