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



