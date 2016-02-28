//
//  main.swift
//  Oblivion
//
//  Created by Joshua Weinstein on 2/24/16.
//  Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation


print("Hello, World!")
print("The Oblivion Programming Lanuage")
print("Version 1.0.0")

var ITP = Interpreter()

//continous interpretation loop
while true {
    print("obl>", terminator:" ")
    var input = readLine()!
    if input == "close" {
        break
    }
    ITP.parseline(input)
}

