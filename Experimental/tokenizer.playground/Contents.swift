//: Playground - noun: a place where people can play

import Cocoa

var str = "Hello, playground"

struct Tokenizer {
    static func Tokenize(line:String, mode:Character="n") -> [String] {
        var splits = line.componentsSeparatedByString(" ")
        if mode == "n" {
            return splits
        }
        else {
            return splits
        }
    }
}

Tokenizer.Tokenize("5 -> 6")

//globally declared custom operators
infix operator <- { associativity left}
prefix operator -% {}

//operator that creates an array from successive association
func <-<elem> (first:elem, second:elem) -> Array<elem> {
    var members = Array<elem>()
    members.append(first)
    members.append(second)
    return members
}

prefix func -% (num:Int) -> Int {
    return random() % num
}
