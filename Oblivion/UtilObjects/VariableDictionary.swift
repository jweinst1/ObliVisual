//
// Created by Joshua Weinstein on 2/28/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//central variable dictionary, houses storage of values
struct VariableDictionary<obj> {
    var map:[obj:obj]

    init() {
        self.map = [obj:obj]()
    }
}
