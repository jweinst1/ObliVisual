//
// Created by Joshua Weinstein on 2/27/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation
//document that contains the math parser

//struct for evaluating math statements
struct MathParser {
    //static sum parsing method
    static func sum(var args:ArgStack<Int>) ->Void {
        while args.stack.count > 1 {
            args.stack[0] += args.stack[1]
            args.stack.removeAtIndex(1)
        }
    }

    static func mul(var args:ArgStack<Int>) ->Void {
        while args.stack.count > 1 {
            args.stack[0] *= args.stack[1]
            args.stack.removeAtIndex(1)
        }
    }
    //multiple subtraction operator
    static func subtract(var args:ArgStack<Int>) ->Void {
        while args.stack.count > 1 {
            args.stack[0] -= args.stack[1]
            args.stack.removeAtIndex(1)
        }
    }
    //reduces stack with division, raises error if dividing by zero.
    static func div(var args:ArgStack<Int>) ->Void {
        while args.stack.count > 1 {
            if args.stack[1] == 0 {
                print("ERR Div by Zero")
                break
            }
            else {
                args.stack[0] /= args.stack[1]
                args.stack.removeAtIndex(1)
            }
        }
    }
    //gets maximum in the stack
    static func max(var args:ArgStack<Int>) ->Void {
        var maximum = 0
        while args.stack.count > 0 {
            var temp = args.pull()
            if maximum < temp {
                maximum = temp
            }
        }
        args.push(maximum)
    }

    static func min(var args:ArgStack<Int>) ->Void {
        var minimum = 0
        while args.stack.count > 0 {
            var temp = args.pull()
            if minimum > temp {
                minimum = temp
            }
        }
        args.push(minimum)
    }
}