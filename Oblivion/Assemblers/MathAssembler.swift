//
// Created by Joshua Weinstein on 3/7/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//struct that can assemble mathematical expressions
struct MathAssembler {
    var current:Int?
    var mode:Character

    init(mode:Character) {
        self.mode = mode
    }

    func assemble(tokens:[Any]) -> Int {

    }
}
