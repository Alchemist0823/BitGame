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
        "level": [1, 2, 3]
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