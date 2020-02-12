//This function handles the following task:
//captures the form input and passes it to display.ejs page for friendly output
exports.displayInfo = function (req, res) {

    //get user input using request object
    var email = req.body.email;
    //make a reference to the session object
    var session = req.session;
    //store the username in session object
    session.email = email;
    console.log("email in session: " + session.email);
    //show the display.ejs page and pass username to it
    res.render('display', {
        email: email
    });

}; //end of function

exports.signup = function (req, res, next) {
    var Student = require('mongoose').model('Student');
    var student = new Student(req.body); 
    student.save(function (err) {
        if (err) {
            return next(err);
        } else {
            //return res.json(student);
            //return res.redirect('/signin', {message:'Student registered'});
            res.render('signin', {
                loginMessage: 'Login to evaluate the course',
                message: 'Student registered'
            });
        }
    });
}

exports.signin = function (req, res, next) {
    var Student = require('mongoose').model('Student');
    Student.findOne({email: req.body.email}, (err, student) => {
        if (student){
            if (student.password == req.body.password){
                res.render('comment', {
                    email: student.email
                });
            }
        }
    });
}

exports.commentsByStudent = function (req, res, next) {
    var email = req.session.email;
    //find the student then its comments using Promise mechanism of Mongoose
    Student.
    findOne({
        email: email
    }, (err, student) => {
        if (err) {
            return getErrorMessage(err);
        }
        //
        req.id = student._id;
        console.log(req.id);
    }).then(function () {
        //find the posts from this author
        Comment.
        find({
            student: req.id
        }, (err, comments) => {
            if (err) {
                return getErrorMessage(err);
            }
            //res.json(comments);
            res.render('comments', {
                comments: comments,
                email: email
            });
        });
    });
};