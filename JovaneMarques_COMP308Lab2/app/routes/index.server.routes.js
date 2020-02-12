//this function handles routing of requests
module.exports = function (app) {
    //load the controller(s)
    var index = require('../controllers/index.server.controller');

    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/signin', function (req, res) {
        res.render('signin', {
            loginMessage: 'Login to evaluate the course'
        });
    });
    app.get('/signup', function (req, res) {
        res.render('signup');
    });
    app.post('/signup', function (req, res) {
        index.signup(req, res);
    });
    app.post('/signin', function (req, res) {
        index.signin(req, res);
    });
    app.post('/', function (req, res) {
        index.displayInfo(req, res);
    });
    app.post('/thankyou', function (req, res) {
        var {
            email,
            comments
        } = req.body;
        res.render('thankyou', {
            email: email,
            comments: comments
        });
    });
};