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
            res.render('signin', {
                loginMessage: 'Login to evaluate the course',
                message: 'Student registered'
            });
        }
    });
}

exports.comment = function (req, res, next) {
    var Comment = require('mongoose').model('Comment');
    //console.log(req.session);
    req.body.student = req.session.student_id; 
    var comment = new Comment(req.body); 
    comment.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.render('thankyou', {
                email: req.body.email,
                comments: req.body.comment
            });
        }
    }); 
}

exports.signin = function (req, res, next) {
    var Student = require('mongoose').model('Student');
    Student.findOne({email: req.body.email}, (err, student) => {
        if (student){
            if (err) {
                return getErrorMessage(err);
            }
            if (student.password == req.body.password){
                let session = req.session;
                session.email = student.email;
                session.student_id = student.id;
                res.render('comment', {
                    email: student.email
                });
            } else {
                return res.send('Wrong password');
            }
        } else {
            return res.send('User not found');
        }
    });
}

exports.allStudents = function (req, res, next) {
    var Student = require('mongoose').model('Student');
    Student.find({}, (err, students) => {
        if (err) {
            return getErrorMessage(err);
        }
        if (students){
            res.render('students', {
                students: students 
            });
        } else {
            return res.send('No students found.')
        }
    });
}

exports.commentsByStudent = function (req, res, next) {
    var email = req.session.email;
    if (!email){ 
        return res.send('You have to login to see this page');
    }
    //find the student then its comments using Promise mechanism of Mongoose
    var Student = require('mongoose').model('Student');
    var Comment = require('mongoose').model('Comment');
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