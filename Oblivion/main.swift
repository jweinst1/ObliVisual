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

let teststring = "5+6+4+8"
var tokens = Tokenizer.Tokenize(teststring)
var lexedtokens = Lexer.lextokens(tokens)
var mach = Assembler()
mach.assemble(lexedtokens)
//continous interpretation loop


