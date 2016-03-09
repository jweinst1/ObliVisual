//
// Created by Joshua Weinstein on 3/9/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation
//primary Token structure, used by the interpreter
struct Token {
    var type:String
    var element:Any

    init(element:Any) {
        self.element = element
        self.type = "NOTNAMED"
    }

    mutating func setelement(element:Any) {
        self.element = element
    }

    mutating func settype(type:String) {
        self.type = type
    }

    func isTyped() -> Bool {
        return self.type != "NOTNAMED"
    }
}
