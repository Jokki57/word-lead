import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './utils/store';

const config = {

};
firebase.initializeApp(config);
store.setValue('database', firebase.database());

ReactDOM.render(
  (<BrowserRouter>
    <App />
  </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
