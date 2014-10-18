var probs = {
    "0" : {
        "title": "level 1",
        "description": "Given an integer x, calculate x + x",
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
        "output": ["2", "4", "6"]
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
        "output": ["1", "2", "4"]
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