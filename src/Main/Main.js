import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from "firebase/index";
import './Main.css';

class Main extends PureComponent {
  constructor(props) {
    super(props);
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
