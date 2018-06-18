import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/index';
import registerServiceWorker from './config/registerServiceWorker';

ReactDOM.hydrate(<App />, document.getElementById('root'));
registerServiceWorker();
