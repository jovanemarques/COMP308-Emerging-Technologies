//The parent() function returned the child() function, 
//and the child() function is called after the parent() function
// has already been executed.
function parent() {
    const message = 'Hello World';
    function child() {
        console.log (message);
    }
    return child;
}
const childFN = parent(); //returns the child() function
childFN(); //displays Hello World
    
