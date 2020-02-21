import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useRouteMatch
} from "react-router-dom";
import "./dynroutes.css";
function App()
{
    let match = useRouteMatch();
    
    return (
        <Router>
            <div>
            <h1>Simple Dynamic Routing!</h1>
            <div className="links">
            <Link to={`${match.path}`} className="link">Home</Link>
            <Link to={`${match.path}/about`} className="link">About</Link>
            <Link to={`${match.path}/users`} className="link">Users</Link>
            </div>
            <div className="tabs">
            <Switch>
                <Route path={`${match.path}`} exact component={Home} />
                <Route path={`${match.path}/about`} component={About} />
                <Route path={`${match.path}/users`} component={Users} />
            </Switch>
            </div>
        </div>
      </Router>
    );
    //
}
//
function Home() {
    return <h2>Home page</h2>;
  }
  
  function About() {
    return <h2>About this page</h2>;
  }
  
  function Users() {
    return <h2>Users page</h2>;
  }
  //
  export default App;
