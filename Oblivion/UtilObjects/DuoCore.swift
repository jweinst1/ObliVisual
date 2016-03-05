//
// Created by Joshua Weinstein on 3/4/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//struct that supports operations done on two elements at a time.
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
