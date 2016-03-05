//
// Created by Joshua Weinstein on 3/2/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

struct IntegerObj {
    var value:Int

    init(val:Int) {
        self.value = val
    }

    mutating func stringinstruc(instr:[String]) {
        //number of instructions must be two
        assert(instr.count == 2)
        let operand = Int(instr[1])!
        switch(instr[0]) {
        case "+":
            self.value += operand
        case "-":
            self.value -= operand
        case "*":
            self.value *= operand
        default:
            self.value += 0
        }
    }

    mutating func increment() {
        self.value++
    }

    mutating func decrement() {
        self.value--
    }

    mutating func add(val:Int) {
        self.value += val
    }

    mutating func subtract(val:Int) {
        self.value -= val
    }
}
