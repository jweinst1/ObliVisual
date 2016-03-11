//
// Created by Joshua Weinstein on 3/10/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//initializable assembler
struct Assembler {
    var mode:String
    var current:Any

    init() {
        self.mode = "FIRST"
    }

    mutating func assemble(var instrucs:[Token]) -> Void {
        self.setupfirst(instrucs)
        for(var i=1;i<instrucs.count;i++) {
            if self.mode == "int" {
                if instrucs[i].type == "oper" {
                    let temp = instrucs[i].element as! String
                    switch(temp) {
                        
                    }
                }
            }
        }
    }
    mutating func setupfirst(instrucs:[Token]) {
        switch(instrucs[0].type) {
        case "int":
            self.mode = "int"
            self.current = instrucs[0].element
        default:
            print("INAVLID TOKEN TYPE")

        }
    }
}
