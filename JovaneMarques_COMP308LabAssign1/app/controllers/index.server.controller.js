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