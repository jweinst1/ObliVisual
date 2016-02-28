//: Playground - noun: a place where people can play

import Cocoa

//playground that can parse math statements for the oblivion language

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
    //subtracts current integers in the stack toward the last value
    mutating func minus() {
        while self.stack.count > 1 {
            self.stack[0] -= self.stack[1]
            self.stack.removeAtIndex(1)
        }
    }
    
    func getlast() ->Int {
        return self.stack.last!
    }
}


class TokenMethods {
    //determines if string is a number
    static func isNumber(input:String) ->Bool {
        let charset = Set(input.characters)
        return charset.isSubsetOf(CharLib.numset)
    }
    //determines if string is a word
    static func isWord(input:String) ->Bool {
        let charset = Set(input.lowercaseString.characters)
        return charset.isSubsetOf(CharLib.letterset)
    }
    //checks if token is a math operator
    static func isMath(input:String) ->Bool {
        let charset = Set(input.lowercaseString.characters)
        return charset.isSubsetOf(CharLib.mathopset)
    }
    
}


struct CharLib {
    //static sets to check for patterns without regex
    static var numset = Set("0123456789".characters)
    static var letterset = Set("abcdefghijklmnopqrstuvwxyz".characters)
    static var mathopset = Set("+-*/%".characters)
}

//can tokenize, read and parse commands from an input line all at once
class Reader {
    
    var istack:IntStack
    var mode:String
    
    init() {
        self.istack = IntStack()
        self.mode = "math"
    }
    
    func parseline(line:String) ->Void {
        let tokens = line.componentsSeparatedByString(" ")
        for(var i=tokens.count-1;i>=0;i--) {
            if TokenMethods.isNumber(tokens[i]) {
                self.istack.push(Int(tokens[i])!)
            }
            switch(tokens[i]) {
            case "+":
                self.istack.sum()
            case "-":
                self.istack.minus()
            case "*":
                self.istack.mul()
            case "p":
                print(self.istack.getlast())
            default: break
                
                
            }
        }
    }
}


var f = Reader()
f.parseline("p + 4 - 6 4")
