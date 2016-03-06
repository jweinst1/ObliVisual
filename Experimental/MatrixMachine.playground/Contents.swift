//: Playground - noun: a place where people can play

import Cocoa
//playground for experimenting with a matrix

struct IntMatrix {
    var rows:Int
    var cols:Int
    var grid:[[Int]]
    var pointer:[Int]
    
    init(rows:Int, cols:Int) {
        self.rows = rows
        self.cols = cols
        self.grid = Array(count: self.rows, repeatedValue:Array(count:self.cols, repeatedValue:0))
        self.pointer = [0, 0]
    }
    //checks for proper indexing
    func indexIsValidForRow(row: Int, column: Int) -> Bool {
        return row >= 0 && row < self.rows && column >= 0 && column < self.cols
    }
    
    subscript(row: Int, col: Int) -> Int {
        get {
            assert(indexIsValidForRow(row, column: col), "Index out of range")
            return self.grid[row][col]
        }
        set {
            assert(indexIsValidForRow(row, column: col), "Index out of range")
            self.grid[row][col] = newValue
        }
    }
    //extends rows
    mutating func extendrows(amount:Int) {
        for _ in 1...amount {
            self.grid.append(Array(count:self.cols, repeatedValue:0))
        }
    }
    //extends columns
    mutating func extendcols(amount:Int) {
        for var elem in self.grid {
            for _ in 1...amount {
                elem.append(0)
            }
        }
    }
    
    mutating func upPointer(amount:Int) {
        self.pointer[0] += amount
    }
    
    mutating func downPointer(amount:Int) {
        self.pointer[0] -= amount 
    }
}


