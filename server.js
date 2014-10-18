
var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");

var data = require("./data.js");
var checker = require("./checkAnswer.js");

var app = express();

//static middleware
var oneDay = 86400000;
app.use(compression());
app.use(express.static(__dirname + '/client', { maxAge: oneDay }));

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

app.get("/api/list", function(req, res){
    res.json(data.list);
});

app.get("/api/prob/:pid", function(req, res){
    res.json(data.probs[pid]);
});

app.post("/api/answer", function(req, res){
    checker.check(req, res);
});

var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});