import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from 'firebase';
import store from './utils/store';
import Auth from './Auth'
import Main from './Main';
import Admin from './Admin';
import Learner from './Learner';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged((user) => {
      store.setValue('user', user);
      this.setState({ user });
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          <Route path="/learn" component={Learner} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
