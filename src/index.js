import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/index';
import registerServiceWorker from './config/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
