import React, {PureComponent, Fragment} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class Auth extends PureComponent {

  render() {
    const style = {display: 'block'};

    return (
      <Fragment>
        <TextField
          style={style}
          hintText="Login"
          floatingLabelText="Login"
        />
        <TextField
          style={style}
          hintText="Password"
          floatingLabelText="Password"
          type="password"
        />
        <RaisedButton style={style} label="Entry" />
      </Fragment>
    )
  }
}
