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

let teststring = "`rrr`&`ttt`&`reee`"
var tokens = Tokenizer.Tokenize(teststring)
var lexedtokens = Lexer.lextokens(tokens)
var mach = Assembler()
mach.assemble(lexedtokens)
print("`who is having dinner?`".matchesForRegexInText("^\\`[^`]*\\`$"))
print("`who is ha$TGFDG`".matchesForRegexInText("^\\`[^`]*\\`$"))
//continous interpretation loop


