var request = require("request");
var data = require("./data.js");

var hackerRankAPIURL = "http://api.hackerrank.com/checker/submission.json";
var APIKey = "hackerrank|213839-105|746d81569191dac077a199e67b1541ba60c1614a";

var baseProgram =
    '#include<stdio.h>\n' +
    'int x,y,z,res;' +
    'int main(){' +
        'scanf("%d%d%d",&x,&y,&z);' +
        'res = userinput;' +
        'printf("%d",res);' +
        'return 0;' +
    '}';

function check(req, callback){
    var reqJson = req.body;
    var pid = reqJson.pid;
    var ans = reqJson.answer;
    var probInfo = data.probs[pid];
    var fullProgram = baseProgram.replace("userinput", ans);
    var testCasesStr = JSON.stringify(probInfo.input);
    var correctOutStr = JSON.stringify(probInfo.output);

    var formData = {
        source: fullProgram,
        lang: 1,
        testcases: testCasesStr,
        api_key: APIKey
    };
    request.post({url:hackerRankAPIURL, formData: formData}, function (err, httpResponse, body) {
        if (err) {
            //console.error('error:', err);
            callback({"error": "connection error", "correct": 0});
        } else {
            var jsonReceived = JSON.parse(body);
            var compileMsg = jsonReceived.result.compilemessage;
            var stderr = jsonReceived.result.stderr;
            var stdout = jsonReceived.result.stdout;
            if (compileMsg == "" && checkRE(stderr) && JSON.stringify(stdout) == correctOutStr) {
                //console.log(JSON.stringify({"correct": 1}));
                callback({"correct": 1});
            }
            else {
                //console.log(JSON.stringify({"error": "wrong answer", "correct": -1}));
                callback({"error": "wrong answer", "correct": 0});
            }
        }
    });
}

function checkRE(stderr){
    var i;
    for(i = 0; i < stderr.length; i++)
        if(stderr[i] != "") return false;
    return true;
}

function getType(c) {
    if (("a" <= c && c <= "z") || ("A" <= c && c <= "Z")) {
        return 1;
    } else if (("0" <= c && c <= "9")) {
        return 2;
    } else if (c == "\t" || c == " " || c == "(" || c == ")") {
        return 4;
    } else
        return 3;
}

function validate(req){
    var reqJson = req.body;
    if(!reqJson.pid || !reqJson.answer || reqJson.answer == "") return {msg:"invalid request"};
    var pid = reqJson.pid;
    var answer = reqJson.answer;
    var probInfo = data.probs[pid];
    var operators = JSON.parse(JSON.stringify(probInfo.operators));

    var str = "";
    var tokens=[];
    var lasttype = 4;
    for (var i = 0; i < answer.length; i ++) {
        var c = answer.charAt(i);
        var type = getType(c);
        if (lasttype != type && (type != 3 || str.length == 0 || c != str.charAt(str.length - 1))) {
            if (lasttype < 4)
                tokens.push({
                    "type": lasttype,
                    "str" : str
                });
            str = c;
            lasttype = type;
        } else
            str += c;
    }
    if (lasttype < 4)
        tokens.push({
            "type": lasttype,
            "str" : str
        });
    console.log(tokens);
    console.log(operators);

    var ops = 0;
    for (var i = 0; i < tokens.length; i ++) {
        if (tokens[i].type == '3') {
            if (operators[tokens[i].str] !== undefined) {
                operators[tokens[i].str] --;
                ops ++;
                if (operators[tokens[i].str] < 0)
                    return {msg:"the number of specific operator exceeds the limitation"};
            } else
                return {msg:"illegal operator"};
        }
    }
    return {msg: "ok", ops: ops};
}

module.exports = {
    check: check,
    validate: validate
};