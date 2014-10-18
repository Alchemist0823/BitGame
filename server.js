
var express = require("express");
var bodyParser = require("body-parser");

var data = require("./data.js");
var checker = require("./checkAnswer.js");

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.json({"content": "Hello World"});
});

app.get("/list", function(req, res){
    res.json(data.list);
});

app.get("/prob/:pid", function(req, res){
    res.json(data.probs[pid]);
});

app.post("/answer", function(req, res){
    checker.check(req, res);
});

var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});