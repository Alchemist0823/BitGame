var probs = {
    "0" : {
        "title": "Double",
        "description": "using only the following bit operations to return the value of x * 2. Input variable: x",
        "operators": {
            "&": 1,
            "|": 1,
            "&&": 1,
            "||": 1,
            "<<": 1,
            ">>": 1,
            "^": 1,
            "!": 1,
            "~": 1,
            "+": 1,
            "-": 1
        },
        "input": ["1", "2", "3"],
        "output": ["2", "4", "6"],
        "level": [1, 2]
    },
    "1" : {
        "title": "Div2",
        "description": "Given an integer x, calculate x / 2",
        "operators": {
            "&": 1,
            "|": 1,
            "&&": 1,
            "||": 1,
            "<<": 1,
            ">>": 1,
            "^": 1,
            "!": 1,
            "~": 1,
            "+": 1,
            "-": 1
        },
        "input": ["2", "4", "8"],
        "output": ["1", "2", "4"],
        "level": [1, 2]
    },
	"2" : {
        "title": "x AND y",
        "description": "Given x and y, calculate x AND y using DeMorgan's law",
        "operators": {
            "&": 0,
            "|": 1,
            "&&": 0,
            "||": 1,
            "<<": 1,
            ">>": 1,
            "^": 1,
            "!": 1,
            "~": 1,
            "+": 0,
            "-": 0
        },
        "input": ["2 3", "5 5", "1 101"],
        "output": ["2", "5", "1"],
        "level": [1, 2]
    },
	"3" : {
        "title": "Two's Complement",
        "description": "Return 1 if x can be represented as an n-bit, two's complement integer",
        "operators": {
            "&": 1,
            "|": 1,
            "&&": 0,
            "||": 0,
            "<<": 1,
            ">>": 1,
            "^": 1,
            "!": 1,
            "~": 1,
            "+": 1,
            "-": 0
        },
        "input": ["5 3", "-4 3", "6 2"],
        "output": ["0", "1", "0"],
        "level": [1, 2]
    },
	"4" : {
        "title": "Normalize",
        "description": "Return 1 if positive, 0 if zero, -1 if negative",
        "operators": {
            "&": 1,
            "|": 1,
            "&&": 0,
            "||": 0,
            "<<": 1,
            ">>": 1,
            "^": 1,
            "!": 1,
            "~": 1,
            "+": 1,
            "-": 0
        },
        "input": ["130", "-23", "0"],
        "output": ["1", "-1", "0"],
        "level": [1, 2]
    },
    "5" : {
        "title": "isPowerOfTwo",
        "description": "isPower2 - returns 1 if x is a power of 2, and 0 otherwise.  Examples: isPower2(5) = 0, isPower2(8) = 1, isPower2(0) = 0. Note that no negative number is a power of 2.",
        "operators": {
            "!": 5,
            "|": 5,
            "&": 5,
            "<<": 5,
            ">>": 5,
            "^": 5,
            "+": 5,
            "~": 5
        },
        "input": ["4", "5", "8","-4","1"],
        "output": ["1", "0", "1","0","1"],
        "level": [10, 15]
    },
    "6" : {
        "title": "Conditional",
        "description": " conditional - same as x ? y : z. Example: conditional(2,4,5) = 4. ",
        "operators": {
            "!": 5,
            "|": 5,
            "&": 5,
            "<<": 5,
            ">>": 5,
            "^": 5,
            "+": 5,
            "~": 5
        },
        "input": ["10 2 1", "1 2 1", "0 1 100"],
        "output": ["2", "2", "100"],
        "level": [10, 15]
    }
};

var list = {
    "0" : {
        "pid": "0",
        "title": "level 1"
    },
    "1" : {
        "pid": "1",
        "title": "level 2"
    },
    "2" : {
        "pid": "2",
        "title": "level 3"
    },
    "3" : {
        "pid": "3",
        "title": "level 4"
    },
    "4" : {
        "pid": "4",
        "title": "level 5"
    },
    "5" : {
        "pid": "5",
        "title": "level 6"
    },
    "6" : {
        "pid": "6",
        "title": "level 7"
    }
};

module.exports = {
    probs: probs,
    list : list
};