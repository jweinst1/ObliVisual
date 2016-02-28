//
// Created by Joshua Weinstein on 2/27/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

class ArrayMath {

    static func sum(array:[Int]) -> Int {
        return array.reduce(0, combine: { (acc, i) in
            return acc + i
        })
    }

    static func product(array:[Int]) -> Int {
        return array.reduce(1, combine: { (acc, i) in
            return acc * i
        })
    }

    static func minus(array:[Int]) -> Int {
        return array.reduce(0, combine: { (acc, i) in
            return acc - i
        })
    }

    static func div(array:[Int]) -> Int {
        return array.reduce(1, combine: { (acc, i) in
            return acc / i
        })
    }
}