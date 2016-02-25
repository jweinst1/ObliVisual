//: Playground - noun: a place where people can play

import Cocoa

//play ground that implements the number struct

//this struct acts as a custom numbering system, give by the radix and sequence of characters in the string
struct Number {
    var sequence:[Character]
    var current: [Character]
    var index:Int
    var last:Character
    var initial:[Character]
    
    init(seq:String) {
        self.sequence = Array(seq.characters)
        self.current = [self.sequence[0]]
        self.index = 0
        self.last = self.sequence[self.sequence.count-1]
        self.initial = [self.sequence[0]]
        
    }
    //prints the current value of the number
    func value() ->Void {
        var printable = ""
        for elem in self.current {
            printable += String(elem)
        }
        print(printable)
    }
    
    //increments the number once
    mutating func increment() ->Void {
        var place = self.current.count-1
        var incmode = true
        while incmode {
            if place == 0 && self.current[place] == self.last {
                self.current[place] = self.sequence[0]
                self.current.insert(self.sequence[0], atIndex: 0)
                incmode = false
            }
            else if self.current[place] == self.last {
                self.current[place] = self.sequence[0]
                place--
            }
            else {
                self.current[place] = self.sequence[self.sequence.indexOf(self.current[place])!+1]
                incmode = false
            }
        }
    }
    //increments the number a multiple number of times.
    mutating func incrementby(times:Int) ->Void {
        for _ in 1...times {
            self.increment()
        }
    }
    
    mutating func decrement() ->Void {
        if self.current == self.initial {
            print("Base Number Cannot decrement")
        }
        var place = self.current.count-1
        var decmode = true
        while decmode {
            if place == 0 && self.current[place] == self.sequence[0] {
                self.current.removeFirst()
                decmode = false
            }
            else if self.current[place] == self.sequence[0] {
                self.current[place] = self.last
                place--
            }
            else {
                self.current[place] = self.sequence[self.sequence.indexOf(self.current[place])!-1]
                decmode = false
            }
        }
    }
    
    mutating func decrementby(times:Int) ->Void {
        for _ in 1...times {
            self.decrement()
        }
    }
}
