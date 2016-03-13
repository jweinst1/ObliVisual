//: Playground - noun: a place where people can play

import Cocoa

//playground that facilitates keyword reading

struct VarDict {
    var dict:[String: Array<String>]
    
    init() {
        self.dict = [String: Array<String>]()
    }
    //sets a value in the dictionary
    mutating func declare(name:String, type:String) {
        self.dict[name] = [type, "NONE"]
    }
    
    mutating func initialize(name:String, val:String) {
        if self.dict.keys.contains(name) {
            self.dict[name]![1] = val
        }
        else {
            print("VARIABLE NOT DECLARED")
        }
    }
    
    mutating func changeval(name:String, newval:String) {
        if self.dict.keys.contains(name) && self.dict[name]![1] != "NONE" {
            self.dict[name]![1] = newval
        }
        else {
            print("VARIABLE NOT INITIALIZED")
        }
    }
    func getval(name:String) -> String {
        assert(self.dict.keys.contains(name) && self.dict[name]![1] != "NONE", "VAR NOT PRSENT")
        return self.dict[name]![1]
    }
}

var f = VarDict()
f.declare("foo", type: "int")
f.initialize("foo", val: "yoo")
f.getval("foo")