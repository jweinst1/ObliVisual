//: Playground - noun: a place where people can play

import Cocoa

//struct that supports operations done on two elements at a time.
struct DuoCore<elem> {
    var previous:[elem]
    var next:elem?
    //allows core to be initialized with no values
    init() {
        self.previous = [elem]()
    }
    //insertion method with priority and only two space memory
    mutating func insert(member:elem) {
        if self.next == nil {
            self.next = member
        }
        else {
            self.previous.insert(self.next!, atIndex: 0)
            self.next = member
        }
    }
    //fuses the two current elements into an array on the previous node
    
    mutating func setnext(member:elem) {
        self.next = member
    }
    
}

var f = DuoCore<Int>()

f.insert(4)




