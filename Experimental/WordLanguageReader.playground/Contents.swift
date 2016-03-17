//: Playground - noun: a place where people can play

import Cocoa

//nested dictionaries

var a:Dictionary = [
    "who":[
        "does":[
            "you":[]
        ]
    ],
    "what":[
        "do":[]
    ],
    "does":[
        "he":[
            "know":[]
        ],
        "or":[]
    ]
]

func find(input:String) -> Bool {
    let words = input.componentsSeparatedByString(" ")
    var current = a
    for(var i=0;i<words.count;i++) {
        if let checker = current[words[i]] {
            current = checker
        }
    }
}


