// Load the module dependencies
const users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
	
	// Set up the 'signup' and 'signin' routes 
	app.get('/signup', users.renderSignup);
	app.post('/register', users.signup);
	//
	app.get('/signin', users.renderSignin);
	app.post('/signin', users.authenticate);
	app.get('/welcome',users.welcome);
	app.get('/welcome2',users.welcome2);
	app.get('/display', users.display);
	
	
};