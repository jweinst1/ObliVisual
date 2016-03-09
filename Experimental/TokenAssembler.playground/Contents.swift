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
    
    init(element:Any) {
        self.element = element
        self.type = "NOTNAMED"
    }
    
    mutating func setelement(element:Any) {
        self.element = element
    }
    
    mutating func settype(type:String) {
        self.type = type
    }
    
    func isTyped() -> Bool {
        return self.type != "NOTNAMED"
    }
}

var sample = "5 + 6 - 8 * 4"
let mathpat = "\\+|\\-|\\*|[0-9]+"


//sample tokenizer
struct Tokenizer {
    static func tokenize(fragments:[String]) -> [Token] {
        var newtokens = [Token]()
        for elem in fragments {
            newtokens.append(Token(element:elem))
        }
        return newtokens
    }
}
// sample tokens made
var sampletokens = Tokenizer.tokenize(sample.matchesForRegexInText(mathpat))

struct Lexer {
    
    static func lextokens(var list:[Token]) -> [Token] {
        for (var i=0;i<list.count;i++) {
            let template = list[i].element as! String
            if template.matchPattern("[1-9][0-9]*") {
                list[i].settype("int")
            }
            else if template.matchPattern("\\+|\\*|\\-") {
                list[i].settype("oper")
            }
        }
        return list
    }
}
//tokens are lexed
var lexedtokens = Lexer.lextokens(sampletokens)

struct Assembler {
    
}
