module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});
	
	app.get('/profile', isLoggedIn, function(req,res) {
		var user = require("./user.js");
		user.addNewUser(req.user);
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
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
		
	res.redirect('/');
}