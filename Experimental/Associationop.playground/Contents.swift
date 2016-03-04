//: Playground - noun: a place where people can play

import Cocoa

infix operator <- { associativity left}

//operator that creates an array from successive association
func <-<elem> (first:elem, second:elem) -> Array<elem> {
    var members = Array<elem>()
    members.append(first)
    members.append(second)
    return members
}

5 <- 6
//[5, 6]

