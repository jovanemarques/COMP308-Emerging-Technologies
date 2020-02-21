import React from 'react';
import ReactDOM from 'react-dom';
//

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() { 
    this.timerID = setInterval( () => this.tick(),1000 );
}
//component is about to be removed
componentWillUnmount() { 
    clearInterval(this.timerID);
}
tick() {
    this.setState( { date: new Date() } );
}

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );

//export default Clock;

function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

export default App;