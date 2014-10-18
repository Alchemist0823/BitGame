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
            console.error('error:', err);
            callback({"error": "connection error", "pass": false});
        } else {
            var jsonReceived = JSON.parse(body);
            var compileMsg = jsonReceived.result.compilemessage;
            var stderr = jsonReceived.result.stderr;
            var stdout = jsonReceived.result.stdout;
            if (compileMsg == "" && checkRE(stderr) && JSON.stringify(stdout) == correctOutStr) {
                console.log(JSON.stringify({"pass": true}));
                callback({"pass": true});
            }
            else {
                console.log(JSON.stringify({"error": "wrong answer", "pass": false}));
                callback({"error": "wrong answer", "pass": false});
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

module.exports = {
    check: check
};