import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

import './Admin.css';

class Admin extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      entries: [{
        origin: 'asdasd',
        translation: 'asdasdas'
      }],
    };
    this.originRef = React.createRef();
    this.translationRef = React.createRef();
    this.originValue = '';
    this.translationValue = '';
  }

  componentDidUpdate(prevProps, { entries: prevEntries }) {

  }

  onOriginInputChanged = (event, newValue) => {
    console.log(newValue);
    this.originValue = newValue;
  };
  onTranslationInputChanged = (event, newValue) => {
    console.log(newValue);
    this.translationValue = newValue;
  };

  onAddEntry = () => {
    if (this.originRef.current && this.translationRef.current) {
      console.log(this.originRef.current);
      this.setState({
        entries: [
          ...this.state.entries,
          { origin: this.originValue, translation: this.translationValue }
        ]
      });
    }
  };

  renderEntries = () => {
    const { entries } = this.state;
    return entries.map((entry, index) => (
      <TableRow key={index}>
        <TableRowColumn>{index}</TableRowColumn>
        <TableRowColumn>{entry.origin}</TableRowColumn>
        <TableRowColumn>{entry.translation}</TableRowColumn>
      </TableRow>
    ));
  };


  render() {
    const { history } = this.props;
    const { entries } = this.state;
    const style = {
      margin: 12,
    };
    return (
      <div>
        <RaisedButton style={style} label="Save" onClick={() => {
          // TODO: implement
        }} />
        <RaisedButton fullWidth={false} style={style} label="Back" onClick={() => {
          history.back()
        }} />

        <Table>
          <TableHeader enableSelectAll>
            <TableRow>
              <TableHeaderColumn>Origin</TableHeaderColumn>
              <TableHeaderColumn>Translation</TableHeaderColumn>
              <TableHeaderColumn> </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderEntries()}
            <TableRow>
              <TableRowColumn>{entries.length}</TableRowColumn>
              <TableRowColumn>
                <TextField hintText="Enter new origin" ref={this.originRef} onChange={this.onOriginInputChanged} />
              </TableRowColumn>
              <TableRowColumn>
                <TextField hintText="Enter relevant translation" ref={this.translationRef}
                           onChange={this.onTranslationInputChanged} />
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

        <RaisedButton fullWidth={false} style={style} label="Add" onClick={this.onAddEntry} />
      </div>
    );
  }
}

export default Admin;
