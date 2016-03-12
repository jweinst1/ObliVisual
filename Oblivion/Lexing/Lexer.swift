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
            else if LexerMethods.isOper(template) {
                list[i].settype("oper")
            }
            else if LexerMethods.isWord(template) {
                list[i].settype("name")
            }
            else if LexerMethods.isString(template) {
                list[i].settype("string")
                var temp = list[i].element as! String
                temp = String(temp.characters.dropFirst())
                temp = String(temp.characters.dropLast())
                list[i].element = temp
            }
        }
        return list
    }

}