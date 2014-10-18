var request = require("request");
var data = require("./data.js");

var hackerRankAPIURL = "http://api.hackerrank.com/checker/submission.json";
var APIKey = "hackerrank|213839-105|746d81569191dac077a199e67b1541ba60c1614a";

function check(req, res){
    var reqJson = req.body;
    var pid = reqJson.pid;
    var ans = reqJson.answer;
    var probInfo = data.probs[pid];
    var fullProgram = probInfo.program.replace("userinput", ans);

    var formData = {
        source: fullProgram,
        lang: 1,
        testcases: '["3 9 70"]',
        api_key: APIKey
    };
    request.post({url:hackerRankAPIURL, formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('failed:', err);
        }
        res.json(JSON.parse(body));
    });
}

module.exports = {
    check: check
};