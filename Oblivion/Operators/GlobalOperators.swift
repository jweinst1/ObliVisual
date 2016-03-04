//
// Created by Joshua Weinstein on 3/4/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation
//globally declared custom operators
infix operator <- { associativity left}

//operator that creates an array from successive association
func <-<elem> (first:elem, second:elem) -> Array<elem> {
    var members = Array<elem>()
    members.append(first)
    members.append(second)
    return members
}
