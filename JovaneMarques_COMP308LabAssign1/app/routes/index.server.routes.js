//this function handles routing of requests
module.exports = function (app) {
  //load the controller(s)
  var index = require('../controllers/index.server.controller');
  
  //handle the routing of get request to the route
  //by showing the login screen
  app.get('/', function (req, res) {
      //display login page
      res.render('index', { loginMessage: 'Login to evaluate the course' });

  });
  //the form uses a post request to the same path ('/')
  app.post('/', function (req, res) {
      //use the controller function
      index.displayInfo(req, res);
  });
  app.post('/thankyou', function (req, res) {
      var {email, comments} = req.body;
      //use the controller function
      res.render('thankyou', { email: email, comments: comments });
  });
};