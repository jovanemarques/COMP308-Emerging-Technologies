//Load the index controller
var index = require('../../app/controllers/index.server.controller');
// Load the 'tasks' controller
var tasks = require('../../app/controllers/tasks.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'users' base routes
    //
    //show the 'index' page if a GET request is made to root
    app.route('/').get(index.render);
    //show the 'add_task' page if a GET request is made to /tasks
    app.route('/tasks').get(index.renderAdd);
    
    // a post request to /tasks will execute createTask method in tasks.server.controller
    app.route('/tasks').post(tasks.createTask);

    app.route('/list_tasks').get(tasks.readTasks);

    // Set up the 'courses' parameterized routes
    app.route('/list_tasks/:taskId').get(tasks.read).put(tasks.updateByTaskId).delete(tasks.deleteByTaskId)
    // Set up the 'taskId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('taskId', tasks.findTaskByTaskId);
    
};