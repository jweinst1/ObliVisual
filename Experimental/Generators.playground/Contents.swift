//: Playground - noun: a place where people can play

import Cocoa
//play ground to implement generators for the Oblivion language

struct numgenerator {
    var current:Int
    var increment:Int
    
    init(increment:Int=1, start:Int=0) {
        self.current = start
        self.increment = increment
    }
    
    mutating func next() ->Int {
        let yield = self.current
        self.current += self.increment
        return yield
    }
}

//facilitates generating continous array of natural numbers
struct intlistgenerator {
    
    var current:[Int]
    var increment:Int
    
    init(increment:Int=1, start:[Int]=[0]) {
        self.current = start
        self.increment = increment
    }
    
    mutating func next() ->[Int] {
        let yield = self.current
        self.current += [self.increment]
        self.increment += 1
        return yield
    }
    
}
//generator for outputting random characters
struct randlettergenerator {
    
    var letters:[Character]
    
    init() {
        self.letters = Array("abcdefghijklmnopqrstuvwxyz".characters)
    }
    
    func next() ->Character {
        let selection = random() % self.letters.count
        return self.letters[selection]
    }
}

struct numpairGenerator {
    var a:Int
    var b:Int
    var increment:Int
    
    init(a:Int=1, b:Int=2, increment:Int=1) {
        self.a = a
        self.b = b
        self.increment = increment
    }
    //gets the next pair in the sequence
    mutating func next()->[Int] {
        let yield = [self.a, self.b]
        self.a += self.increment
        self.b += self.increment
        return yield
    }
    //calls the next method a certain number of times, and returns the resulting array.
    mutating func getnextpairs(times:Int) ->[[Int]] {
        var pairs = [[Int]]()
        for _ in 1...times {
            pairs.append(self.next())
        }
        return pairs
    }
}



