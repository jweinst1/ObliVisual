//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

struct IntStack {
    var stack:[Int]

    init() {
        self.stack = [Int]()
    }
    //pushes an element down
    mutating func push(val:Int) {
        self.stack.append(val)
    }
    //returns top element
    mutating func pull() -> Int {
        return self.stack.popLast()!
    }
}