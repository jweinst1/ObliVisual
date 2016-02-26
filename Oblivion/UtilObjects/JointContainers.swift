//
// Created by Joshua Weinstein on 2/25/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation


//pair objects to join values together. Useful for type storage
struct pair<T> {
    var first:T
    var second:T

    init(first:T, second:T) {
        self.first = first
        self.second = second
    }

    mutating func setfrist(val:T) {
        self.first = val
    }

    mutating func setsecond(val:T) {
        self.second = val
    }
}