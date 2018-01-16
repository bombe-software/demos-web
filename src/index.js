import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    // npm run-script build
    // npm start
    console.log(process.env.NODE_ENV);
    return <p> Hello React project ;)</p>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
