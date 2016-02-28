//: Playground - noun: a place where people can play

import Cocoa
//playground that implements a hash type of string search

struct StrNumerator {
    //returns an array of numerated substrings, in the format X-#, where # is the numerator
    static func numerate(input:String) ->[String] {
        let charset = input.characters
        var numerated = [String]()
        var i = 0
        for elem in charset {
            let obj = String(elem) + "-" + String(i)
            numerated.append(obj)
            i++
        }
        return numerated
    }
}
//performs a bool search for a string within another string
//only works for same place, not different places
func DirectSearch(str:String, substr:String) -> Bool {
    let strset = Set(StrNumerator.numerate(str))
    let substrset = Set(StrNumerator.numerate(substr))
    return substrset.isSubsetOf(strset)
}

DirectSearch("love is wonderful and hope", substr: "love")
//true



//relative ordering of strings

struct RelativeOrdering {
    
    static func relativate(input:String) -> [String] {
        let charset = Array(input.characters)
        var relatives = [String]()
        for(var i=0;i<charset.count-1;i++) {
            let obj = String(charset[i]) + "->" + String(charset[i+1])
            relatives.append(obj)
        }
        return relatives
    }
}


func RelativeSearch(str:String, substr:String) ->Bool {
    let strset = Set(RelativeOrdering.relativate(str))
    let substrset = Set(RelativeOrdering.relativate(substr))
    return substrset.isSubsetOf(strset)
}

RelativeSearch("boohoo, I dont like you any more", substr: "any")
//true
