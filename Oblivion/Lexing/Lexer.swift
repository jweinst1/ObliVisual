//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//main file to implement a lexer


struct Lexer {
    static func lextokens(var list:[Token]) -> [Token] {
        for (var i=0;i<list.count;i++) {
            let template = list[i].element as! String
            if template.matchPattern("[0-9]+") {
                list[i].settype("int")
                list[i].element = Int(template)!
            }
            else if template.matchPattern(TokenPatterns.allopers) {
                list[i].settype("oper")
            }
            else if LexerMethods.isWord(template) {
                list[i].settype("name")
            }
        }
        return list
    }

}