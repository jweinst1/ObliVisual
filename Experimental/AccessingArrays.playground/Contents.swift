//: Playground - noun: a place where people can play

import Cocoa

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
    
    func getlast() ->Int {
        return self.stack.last!
    }
}


