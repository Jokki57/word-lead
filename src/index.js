import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase';
import './index.css';
import config from './config/config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './utils/store';

firebase.initializeApp(config);
store.setValue('database', firebase.database());

ReactDOM.render(
  (<BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
