//: Playground - noun: a place where people can play

import Cocoa
//playground the implements mathoper structs

struct ArithOper {
    var oper:Character
    var operand:Int
    
    init(oper:Character, operand:Int) {
        self.oper = oper
        self.operand = operand
    }
    
    func apply(val:Int) ->Int {
        switch(self.oper) {
        case "+":
            return val + self.operand
        case "-":
            return val - self.operand
        case "*":
            return val * self.operand
        case "/":
            return val / self.operand
        case "%":
            return val % self.operand
        default:
            return val
        }
    }
}

//written for ints
struct BoolOper {
    
    var oper:Character
    var operand:Int
    
    init(oper:Character, operand:Int) {
        self.oper = oper
        self.operand = operand
    }
    
    func apply(val:Int) ->Bool {
        switch(self.oper) {
        case "e":
            return val == self.operand
        case ">":
            return val > self.operand
        case "<":
            return val < self.operand
        default:
            return true
        }
    }
}
