/**
 * Created by Josh on 4/2/16.
 */

var HelpString = "The Oblivion language works off of a reverse operand syntax\n" +
    "This means that, instead of 5 + 5, oblivion writes them like + 5 5.\n" +
    "Unlike Scheme syntax, oblivion has no parenthesis. The operators or function calls in oblivion evaluate all\n" +
    "previous elements in the stack.\n" +
    "Addition +: Example + 1 2 3 4 gives 10\n" +
    "subtraction -, multplicaiton, *, division / work the same.\n" +
    "equal comparison ==: Example == 4 5 6 gives false. Compares each element in the stack to the first element\n" +
    "greater than or less than > 4 5 6, < 9 9 9\n" +
    "combining operaotrs == 1 + 4 - 5 6. Here the two operands for the == oper will be 1 and 3.\n" +
    "construct a list object using list 1 2 3 4\n" +
    "append to a list object using << [] 1 2 3 4\n" +
    "A list literal can be treated as [1,2,3,4] with no spaces\n" +
    "bind a variable using = @name value, such as = @foo << [] 5 6 7\n" +
    "this command binds a variable named @foo to the list 5,6,7\n" +
    "To get a range of numbers from 0, use [~]. such as [~] 5 gives 0,1,2,3,4\n" +
    "to concat objects, use &. Typing & 7 8 gives 78. Or typing & on strings concats them\n" +
    "use set, such as set 1 2 3 to get a hashable set. or << () 1 2 3\n";

exports.HelpString = HelpString;
