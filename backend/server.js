
var express = require("express");
var data = require("./data.js");
var checker = require("./checkAnswer.js");

var app = express();

app.get("/", function(req, res){
    res.json({"content": "Hello World"});
});

app.post("/answer", function(req, res){
    checker.check(req, res);
});

app.get("/list", function(req, res){
    res.json(data.list);
});

app.get("/prob/:pid", function(req, res){
    res.json(data.probs[pid]);
});

var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});