//: Playground - noun: a place where people can play

import Cocoa

var str = "Hello, playground"
//extension that allows to test for a match in a string
extension String {
    func matchPattern(patStr:String)->Bool {
        var isMatch:Bool = false
        do {
            let regex = try NSRegularExpression(pattern: patStr, options: [.CaseInsensitive])
            let result = regex.firstMatchInString(self, options: NSMatchingOptions(rawValue: 0), range: NSMakeRange(0, characters.count))
            
            if (result != nil)
            {
                isMatch = true
            }
        }
        catch {
            isMatch = false
        }
        return isMatch
    }
}

"hello sir".matchPattern("^h.+")
//extension that allows for matches in a string to be extracted
extension String {
    func matchesForRegexInText(regex: String!) -> [String] {
        
        do {
            let regex = try NSRegularExpression(pattern: regex, options: [])
            let nsString = self as NSString
            let results = regex.matchesInString(self,
                options: [], range: NSMakeRange(0, nsString.length))
            return results.map { nsString.substringWithRange($0.range)}
        } catch let error as NSError {
            print("invalid regex: \(error.localizedDescription)")
            return []
        }
    }
}

"5 is good 5y 58 5f".matchesForRegexInText("5.")

//finding tokens in a line of code

"x <- 6".matchesForRegexInText("\\(|\\)|\\[|\\]|\\.|\\@|[a-zA-Z]+|[0-9]+|<-")


