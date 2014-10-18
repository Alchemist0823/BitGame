var baseIntProgram =
    '#include<stdio.h>\n' +
    'int x,y,z,res;' +
    'int main(){' +
        'scanf("%d%d%d",&x,&y,&z);' +
        'res = userinput;' +
        'printf("%d",res);' +
        'return 0;' +
    '}';


var probs = {
    "0" : {
        "title": "level 1",
        "description": "task 1",
        "program": baseIntProgram
    },
    "1" : {
        "title": "level 2",
        "description": "task 11",
        "program": ""
    },
    "2" : {
        "title": "level 3",
        "description": "task 111",
        "program": ""
    },
    "3" : {
        "title": "level 4",
        "description": "task 121",
        "program": ""
    },
    "4" : {
        "title": "level 5",
        "description": "task 123",
        "program": ""
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