//: Playground - noun: a place where people can play

import Cocoa
//playground the implements the enumerators

//string numerator
struct strenumerator {
    var map:[String: Int]
    var currentnum:Int
    
    init() {
        self.map = [String:Int]()
        self.currentnum = 1
    }
    
    mutating func add(val:String) {
        if self.map.keys.contains(val) {
            print("Enumerator already contains \(val)")
        }
        else {
            self.map[val] = self.currentnum
            self.currentnum += 1
        }
    }
    //allows getitem access for checking values
    subscript(key:String) ->Int {
        return self.map[key]!
    }
    //allows an array of strings to be enumerated
    mutating func addarray(vals:[String]) {
        for elem in vals {
            self.add(elem)
        }
    }
    
}
