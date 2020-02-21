import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch, // to match the current URL
  useParams // to access match.params of the current <Route>.
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
// The route /topics loads the Topics component, 
// which renders any further <Route>'s conditionally 
// on the paths :id value.
function Topics() {
  //useRouteMatch() returns an object of key/value pairs 
  // of URL parameters
  //used to access match.params of the current <Route>.
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components Page</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State Page
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  //useParams returns an object of key/value pairs
  // of URL parameters. Use it to access match.params
  // of the current <Route>.
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
//
export default App;