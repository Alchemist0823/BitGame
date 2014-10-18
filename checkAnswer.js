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

function check(req, res){
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
    request.post({url:hackerRankAPIURL, formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            console.error('failed:', err);
            res.json({"error": "connection error", "pass": false});
            return;
        }
        var jsonRes = JSON.parse(body);
        var compileMsg = jsonRes.result.compilemessage;
        var stderr = jsonRes.result.stderr;
        var stdout = jsonRes.result.stdout;
        if(compileMsg == "" && checkRE(stderr) && JSON.stringify(stdout) == correctOutStr){
            res.json({"pass": true});
        }
        else {
            res.json({"error:": "wrong answer", "pass": false});
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