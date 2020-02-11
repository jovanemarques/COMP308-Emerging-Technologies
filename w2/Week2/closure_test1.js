//In the following example the child() function has access 
// to variable message defined in the parent() function
function parent() {
	const message = "Hello World";
	function child() {
		console.log(message); //has access to parent scope
	}
	child();
}
parent(); //displays Hello World
