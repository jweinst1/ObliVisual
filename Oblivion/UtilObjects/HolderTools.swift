//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//used for evaluating math statements in reverse order
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
    //sums the current integers in the stack toward the last value
    mutating func sum() {
        let index = self.stack.count-1
        for i in 0..<index {
            self.stack[index] += self.stack[i]
            self.stack.removeAtIndex(i)
        }
    }
    //multiplies current integers in the stack toward the last value
    mutating func mul() {
        let index = self.stack.count-1
        for i in 0..<index {
            self.stack[index] *= self.stack[i]
            self.stack.removeAtIndex(i)
        }
    }

    func getlast() ->Int {
        return self.stack.last
    }
}