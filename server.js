
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var compression = require("compression");
var session = require("cookie-session");

var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var app = express();
var configDB = require('./facebookAuth/database.js');

var data = require("./data.js");
var checker = require("./checkAnswer.js");
var user = require("./user.js");

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

user.readAllUserData();

mongoose.connect(configDB.url);

var app = express();

// Facebook stuff
require('./facebookAuth/passport')(passport);


	app.use(morgan('dev'));
	app.use(cookieParser());
	app.use(bodyParser());
	
	app.set('view engine','ejs');
	
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	app.get('/', function(req, res) {
		res.render('./index.html');
	});
	
	app.get('/profile', isLoggedIn, function(req,res) {
		user.addNewUser(req.user.facebook.email);
		console.log(user.getUserData(req.user.facebook.email));
		req.session.uid = req.user.facebook.email;
		res.render('index2.html');
	});
	
	app.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email'}));
	
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));
	
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
		
	res.redirect('/');
}
	
//static middleware
var oneDay = 86400000;
app.use(compression());
app.use(express.static(path.join(__dirname, 'client'), { maxAge: oneDay }));
app.use(session({
    secret : "123123123123123"
}))

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.render("index");
});

app.get("/api/login/:uid", function(req, res){
    if (req.params.uid) {

        if (!user.getUserData(req.params.uid)) {
            user.addNewUser(req.params.uid);
        }
        req.session.uid = req.params.uid;
        res.json({"ok": 1});
    }
    res.json({"ok": 0});
});

app.get("/api/list", function(req, res){
    var probs = JSON.parse(JSON.stringify(data.list));
    if (req.session.uid) {
		console.log(req.session.uid);
		console.log(user.userData);
        var userObj = user.getUserData(req.session.uid);
        for (var attr in userObj.prob) {
            probs[attr].correct = userObj.prob[attr].correct;
            probs[attr].ops = userObj.prob[attr].ops;
            //probs[attr]["date"] = userObj.prob[attr]["date"];
        }
    }
    res.json(probs);
});

app.get("/api/prob/:pid", function(req, res){

    var prob = JSON.parse(JSON.stringify(data.probs[req.params.pid]));
    if (req.session.uid) {
        var userObj = user.getUserData(req.session.uid);
        if (userObj.prob[req.params.pid]) {
            prob.correct = userObj.prob[req.params.pid].correct;
            prob.ops = userObj.prob[req.params.pid].ops;
            prob.date = userObj.prob[req.params.pid].date;
            prob.answer = userObj.prob[req.params.pid].answer;
        }
    }
    res.json(prob);
});

app.post("/api/answer", function(req, res){
    var result = checker.validate(req);
    if (result.msg == "ok"){
        console.log("passed validation");
        checker.check(req, function(resJson) {
            console.log(resJson);
            if (req.session.uid) {
                var userObj = user.getUserData(req.session.uid);

                if (!userObj.prob[req.body.pid] ||
                        (resJson.correct && (!userObj.prob[req.body.pid].correct || (userObj.prob[req.body.pid].ops > result.ops)))
                        || (!resJson.correct && !userObj.prob[req.body.pid].correct)) {
                    userObj.prob[req.body.pid] = {
                        "correct": resJson.correct,
                        "ops": result.ops,
                        "date": new Date(),
                        "answer": req.body.answer
                    };
                    user.writeAllUserData();
                }
                res.json({"correct": resJson.correct, "ops": result.ops});
            } else
                res.json({"correct": resJson.correct, "ops": result.ops});
        });
    } else {
        res.json({"error": result.msg});
    }
});

var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});