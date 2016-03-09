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

var sample = "5&7^6+1"
let mathpat = "\\+|\\-|\\*|[0-9]+|\\^|_|\\&"


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

struct operfuncs {
    static func max(num1:Int, num2:Int) -> Int {
        if num1 > num2 {
            return num1
        }
        else {
            return num2
        }
    }
    
    static func min(num1:Int, num2:Int) -> Int {
        if num1 < num2 {
            return num1
        }
        else {
            return num2
        }
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
                list[i].element = Int(template)!
            }
            else if template.matchPattern("\\+|\\*|\\-|\\^|_|\\&") {
                list[i].settype("oper")
            }
        }
        return list
    }
}
//tokens are lexed
var lexedtokens = Lexer.lextokens(sampletokens)

//assembler which carries two distinct types of assemble styles
struct Assembler {
    
    static func linearassemble(instructions:[Token]) -> Void {
        //default initialization
        var current = 0
        for(var i=0;i<instructions.count;i++) {
            if instructions[i].type == "int" && i == 0 {
                current = instructions[i].element as! Int
            }
            else if instructions[i].type == "oper" {
                let temp = instructions[i].element as! String
                switch(temp) {
                case "+":
                    current += instructions[i+1].element as! Int
                case "^":
                    current = operfuncs.max(current, num2: instructions[i+1].element as! Int)
                case "_":
                    current = operfuncs.min(current, num2: instructions[i+1].element as! Int)
                case "-":
                    current -= instructions[i+1].element as! Int
                case "&":
                    current = Int(String(current) + String(instructions[i+1].element as! Int))!
                case "*":
                    current *= instructions[i+1].element as! Int
                default:
                    print("OPER ERROR")
                }
            }
        }
        print(current)
    }
}
// assembles the tokens to a result
Assembler.linearassemble(lexedtokens)

//top level function to process input lines for user
func Interpret(line:String) -> Void {
    let sample = line.matchesForRegexInText(mathpat)
    let tokens = Tokenizer.tokenize(sample)
    let lexed = Lexer.lextokens(tokens)
    Assembler.linearassemble(lexed)
}
