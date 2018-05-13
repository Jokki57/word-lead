import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';
import store from './utils/store';
import Auth from './Auth'
import Admin from './Admin';
import Learner from './Learner';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.setValue('user', user);
        this.setState({ user });
      } else {
        props.history.push('/auth');
      }
    });
  }


  render() {
    const { history } = this.props;
    const { user } = this.state;
    const style = {
      margin: 12,
    };
    return (
      <MuiThemeProvider>
        <Fragment>
          <div>
            <RaisedButton style={style} label="Admin" onClick={() => {
              history.push('/admin')
            }} />
            <RaisedButton fullWidth={false} style={style} label="Learn" onClick={() => {
              history.push('/learn')
            }} />
          </div>
          <div>
            <Route path="/admin" render={() => <Admin user={user} />} />
            <Route path="/auth" component={Auth} />
            <Route path="/learn" render={() => <Learner user={user} />} />
          </div>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
