import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from "firebase/index";
import './Main.css';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
        const {history} = props;
        history.push('/auth');
      }
    });
  }


  render() {
    const {history} = this.props;
    const style = {
      margin: 12,
    };
    return (
      <div>
        <RaisedButton style={style} label="Admin" onClick={() => {history.push('/admin')}} />
        <RaisedButton fullWidth={false} style={style} label="Learn" onClick={() => {history.push('/learn')}} />
      </div>
    );
  }
}

export default Main;
