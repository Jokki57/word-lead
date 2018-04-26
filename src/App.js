import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from 'firebase';
import Auth from './Auth'
import Main from './Main';
import Admin from './Admin';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: "AIzaSyBeVA2f3gAr3XKwctvM1qO2Rzfktee66hQ",
      authDomain: "word-lead.firebaseapp.com",
      databaseURL: "https://word-lead.firebaseio.com",
      projectId: "word-lead",
      storageBucket: "word-lead.appspot.com",
      messagingSenderId: "285595957886"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });

    this.state = {
      user: null,
    };
  }


  render() {
    const { user } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/admin" render={(props) => (<Admin {...props} user={user} />)}/>
          <Route path="/auth" component={Auth} />
          <Route path="/learn/:type?" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
