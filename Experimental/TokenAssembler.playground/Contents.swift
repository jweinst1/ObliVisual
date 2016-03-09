//: Playground - noun: a place where people can play
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
import Cocoa
//token class for type recording
struct Token {
    var type:String
    var element:Any
    
    init(element:Any, type:String) {
        self.type = type
        self.element = element
    }
    
    mutating func setelement(element:Any) {
        self.element = element
    }
    
    mutating func settype(type:String) {
        self.type = type
    }
}

var sample = "5 + 6 - 8 * 4"
let mathpat = "\\+|\\-|\\*|[0-9]+"
sample.matchesForRegexInText(mathpat)

struct Tokenizer {
    static func tokenize(fragments:[String]) -> [Token] {
        var newtokens = [Token]()
        for elem in fragments {
            
        }
    }
}
