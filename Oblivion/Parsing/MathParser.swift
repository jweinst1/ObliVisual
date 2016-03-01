//
// Created by Joshua Weinstein on 2/27/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation
//document that contains the math parser

//struct for evaluating math statements
struct MathParser {
    //static sum parsing method
    static func sum(args:ArgStack) ->Void {
        while args.stack.count > 1 {
            args.stack[0] += args.stack[1]
            args.stack.removeAtIndex(1)
        }
    }

    static func mul(args:ArgStack) ->Void {
        while args.stack.count > 1 {
            args.stack[0] *= args.stack[1]
            args.stack.removeAtIndex(1)
        }
    }
    //multiple subtraction operator
    static func subtract(args:ArgStack) ->Void {
        while args.stack.count > 1 {
            args.stack[0] -= args.stack[1]
            args.stack.removeAtIndex(1)
        }
    }
    //reduces stack with division, raises error if dividing by zero.
    static func div(args:ArgStack) ->Void {
        while args.stack.count > 1 {
            if args.stack[1] == 0 {
                print("ERR Div by Zero")
            }
            else {
                args.stack[0] /= args.stack[1]
                args.stack.removeAtIndex(1)
            }
        }
    }
}