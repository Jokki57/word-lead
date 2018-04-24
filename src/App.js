import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './Auth'
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Route path="/admin" />
            <Route path="/auth" component={Auth} />
            <Route path="/learn/:type" />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
