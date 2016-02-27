//: Playground - noun: a place where people can play

import Cocoa

//playground for testing array funcs for math



class ArrayMath {
    
    static func sum(array:[Int]) -> Int {
        return array.reduce(0, combine: { (acc, i) in
            return acc + i
        })
    }
    
    static func product(array:[Int]) -> Int {
        return array.reduce(1, combine: { (acc, i) in
            return acc * i
        })
    }
    
    static func minus(array:[Int]) -> Int {
        return array.reduce(0, combine: { (acc, i) in
            return acc - i
        })
    }
    
    static func div(array:[Int]) -> Int {
        return array.reduce(0, combine: { (acc, i) in
            return acc / i
        })
    }
}

[1].re


