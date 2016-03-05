//: Playground - noun: a place where people can play

import Cocoa

struct DuoCore<elem> {
    var previous:elem?
    var next:elem?
    //allows core to be initialized with no values
    init() {
        
    }
    //insertion method with priority and only two space memory
    mutating func insert(member:elem) {
        if self.previous == nil {
            self.previous = member
        }
        else if self.next == nil {
            self.next = member
        }
        else {
            let holder = self.next
            self.previous = holder
            self.next = member
        }
    }
}


