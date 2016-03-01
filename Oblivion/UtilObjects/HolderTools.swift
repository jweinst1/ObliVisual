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
        self.stack.insert(val, atIndex: 0)
    }
    //returns top element
    mutating func pull() -> Int {
        return self.stack.popLast()!
    }
    //sums the current integers in the stack toward the last value
    mutating func sum() {
        while self.stack.count > 1 {
            self.stack[0] += self.stack[1]
            self.stack.removeAtIndex(1)
        }
    }
    //multiplies current integers in the stack toward the last value
    mutating func mul() {
        while self.stack.count > 1 {
            self.stack[0] *= self.stack[1]
            self.stack.removeAtIndex(1)
        }
    }

    //subtracts current integers in the stack toward the last value
    mutating func minus() {
        while self.stack.count > 1 {
            self.stack[0] -= self.stack[1]
            self.stack.removeAtIndex(1)
        }
    }

    func getlast() ->Int {
        return self.stack.last!
    }
}

//stack struct that holds arguments
struct ArgStack<elem> {
    var stack:[elem]

    init() {
        self.stack = [elem]()
    }

    subscript(index:Int) -> elem {
        return self.stack[index]
    }

    //pushes an element down
    mutating func push(val:elem) {
        self.stack.insert(val, atIndex: 0)
    }
    //returns top element
    mutating func pull() -> elem {
        return self.stack.popLast()!
    }
    //gets length of stack
    func length() -> Int {
        return self.stack.count
    }
    //clears out the stack
    mutating func flush() {
        self.stack = [elem]()
    }
}
