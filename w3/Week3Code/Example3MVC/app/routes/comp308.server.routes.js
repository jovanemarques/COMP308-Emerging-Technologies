const comp308 = require('../controllers/comp308.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/comp308', comp308.displayComp308Page);
};