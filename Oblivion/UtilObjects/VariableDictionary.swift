//
// Created by Joshua Weinstein on 2/28/16.
// Copyright (c) 2016 Joshua Weinstein. All rights reserved.
//

import Foundation

//central variable dictionary, houses storage of values
struct VariableDictionary<obj> {
    var map:[String:obj]

    init() {
        self.map = [String:obj]()
    }

    subscript (key:String) -> obj {
        get {
            return self.map[key]!
        }
        set(newval) {
            self.map[key] = newval
        }
    }

    //checks if key is in dict
    func containsvariable(key:String) ->Bool {
        return self.map.keys.contains(key)
    }
}
