//
// Created by Joshua Weinstein on 2/26/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//file for implementing token utility functions

struct OperTokens {
    static let math = Set("+ - * / % ^ _ **".componentsSeparatedByString(" "))
    static let list = Set("<+ -> ! ~".componentsSeparatedByString(" "))
    static let comparison = Set("== != >= <= > < &=".componentsSeparatedByString(" "))
    static let bool = Set("and or not".componentsSeparatedByString(" "))
    static let chain = Set("all any".componentsSeparatedByString(" "))
    static let containers = Set("list set string [] () ;;".componentsSeparatedByString(" "))
    static let declare = Set("@ # $".componentsSeparatedByString(" "))
}

struct CharLib {
    //static sets to check for patterns without regex
    static let intset = Set("0123456789".characters)
    static let letterset = Set("abcdefghijklmnopqrstuvwxyz".characters)
    static let doubleset = Set("0123456789.".characters)
    static let containerset = Set("[]{}()<>".characters)
}