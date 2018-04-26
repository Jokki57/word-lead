import React, { PureComponent } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';


export default class Auth extends PureComponent {

  componentDidMount() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#auth-container', {
      signInSuccessUrl: window.location.origin,
      signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      // Other config options...
    });

  }

  render() {
    return (
      <div id="auth-container" />

      // {/*<Fragment>*/}
      //   {/*<TextField*/}
      //     {/*style={style}*/}
      //     {/*hintText="Login"*/}
      //     {/*floatingLabelText="Login"*/}
      //   {/*/>*/}
      //   {/*<TextField*/}
      //     {/*style={style}*/}
      //     {/*hintText="Password"*/}
      //     {/*floatingLabelText="Password"*/}
      //     {/*type="password"*/}
      //   {/*/>*/}
      //   {/*<RaisedButton style={style} label="Entry" />*/}
      // {/*</Fragment>*/}
    )
  }
}
