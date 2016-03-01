//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//file for implementing token utility functions

struct OperTokens {
    static let math = "+ - * / % ^ _ **".componentsSeparatedByString(" ")
    static let list = "<+ -> ! ~".componentsSeparatedByString(" ")
    static let comparison = "== != >= <= > < &=".componentsSeparatedByString(" ")
    static let bool = "and or not".componentsSeparatedByString(" ")
    static let chain = "all any".componentsSeparatedByString(" ")
}