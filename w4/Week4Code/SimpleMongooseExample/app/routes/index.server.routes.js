//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument 

// Load the 'users' controller to use User methods create and list
var users = require('../controllers/users.server.controller');
//Load the 'index' controller
var index = require('../controllers/index.server.controller');
//
//handle routing for get and post request
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', index.render); //go to http://localhost:3000/
    //handle a post request made to root path
    app.post('/', users.create); 

    //handle a post request made to /comp308students - to save a user
    //handle a get request made to /comp308students - to list all documents
    

};
