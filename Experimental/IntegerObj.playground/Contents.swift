//: Playground - noun: a place where people can play

import Cocoa

//playground to implement the integer object

struct Integerobj {
    var value:Int
    
    init(val:Int=0) {
        self.value = val
    }
    
    mutating func increment() {
        self.value++
    }
    
    mutating func decrement() {
        self.value--
    }
    
    mutating func add(other:Int) {
        self.value += other
    }
    
    mutating func subtract(other:Int) {
        self.value -= other
    }
    
    mutating func multiply(other:Int) {
        self.value *= other
    }
    
    mutating func divide(other:Int) {
        self.value /= other
    }
    
    mutating func remainder(other:Int) {
        self.value %= other
    }
    //gets the range of numbers from 0 to the current number
    func rangefromzero() ->[Int] {
        var seq = [Int]()
        for num in 0..<self.value {
            seq.append(num)
        }
        return seq
    }
}
