
var express = require("express");
var bodyParser = require("body-parser");

var data = require("./data.js");
var checker = require("./checkAnswer.js");

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/client');
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.render("index");
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