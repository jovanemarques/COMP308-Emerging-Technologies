// Create a new 'render' controller method
exports.displayComp308Page = function (req, res) {
    

    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('comp308', {
        message: 'Message from COMP308 Controller'
    });
};
