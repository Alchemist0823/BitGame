var probs = {
    "0" : {
        "title": "level 1",
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
        "title": "level 2",
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
        "title": "level 3",
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
        "title": "level 4",
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
        "title": "level 5",
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
    }
};

module.exports = {
    probs: probs,
    list : list
};