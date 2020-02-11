// Load the module dependencies
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const methodOverride = require('method-override');
const flash = require('connect-flash');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	const app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'cookie-parser' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(cookieParser());

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	  });
	//
	app.use(methodOverride());

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Load the routing files
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);

	// Configure static file serving
	app.use(express.static('./public'));

	// Return the Express application instance
	return app;
};