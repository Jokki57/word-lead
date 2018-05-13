import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import EditorModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ActionDoneIcon from 'material-ui/svg-icons/action/done';
import ActionDeleteIcon from 'material-ui/svg-icons/action/delete';
import Paper from 'material-ui/Paper';
import { saveEntries, loadEntries } from '../utils/saveLoadEntries';
import store from '../utils/store';

import './Admin.css';

class Admin extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
    };
    this.tempEditingValues = {};
    this.originValue = '';
    this.translationValue = '';
  }

  componentDidMount() {

    const ent = store.getValue('entries');
    if (!ent) {

    } else {
      this.processEntries(ent);
    }
  }

  componentDidUpdate({ user: prevUser }) {
    const { user } = this.props;
    if (user && user !== prevUser) {
      loadEntries().then(this.processEntries);
    }
  }

  onEditButtonClick = (index) => () => {
    const entries = [
      ...this.state.entries,
    ];
    entries[index].isEditing = !entries[index].isEditing;
    if (!entries[index].isEditing) {
      if (this.tempEditingValues[index].origin) {
        entries[index].origin = this.tempEditingValues[index].origin;
      }
      if (this.tempEditingValues[index].translation) {
        entries[index].translation = this.tempEditingValues[index].translation;
      }
    } else {
      if (!this.tempEditingValues[index]) {
        this.tempEditingValues[index] = {};
      }
      this.tempEditingValues[index].origin = entries[index].origin;
      this.tempEditingValues[index].translation = entries[index].translation;
    }

    this.setState({
      entries,
    }, () => {
      this.save();
    })
  };

  onRemoveButtonClick = (index) => () => {
    const entries = [
      ...this.state.entries,
    ];
    entries.splice(index, 1);
    delete this.tempEditingValues[index];
    this.setState({
      entries,
    }, () => {
      this.save();
    })
  };

  onAddOriginInputChanged = (event, newValue) => {
    this.originValueAdd = newValue;
  };
  onAddTranslationInputChanged = (event, newValue) => {
    this.translationValueAdd = newValue;
  };

  onEditOriginInputChanged = (index) => (event, newValue) => {
    this.tempEditingValues[index] = {
      ...this.tempEditingValues[index],
      origin: newValue,
    };
  };
  onEditTranslationInputChanged = (index) => (event, newValue) => {
    this.tempEditingValues[index] = {
      ...this.tempEditingValues[index],
      translation: newValue,
    };
  };

  onAddEntry = () => {
    this.setState({
      entries: [
        ...this.state.entries,
        {
          origin: this.originValueAdd,
          translation: this.translationValueAdd,
          isEditing: false,
        }
      ]
    }, () => {
      this.save();
    });
  };

  processEntries = (entries) => {
    const stateEnties = [];
    if (Array.isArray(entries)) {
      entries.forEach(({ origin, translation }) => {
        stateEnties.push({
          isEditing: false,
          origin,
          translation,
        })
      })
    }
    this.setState({ entries: stateEnties });
  };

  save = () => {
    const { entries } = this.state;
    const entriesToSave = [];
    entries.forEach(({ origin, translation }) => {
      entriesToSave.push({ origin, translation });
    });
    saveEntries(entriesToSave)
  };

  renderEntries = () => {
    const { entries } = this.state;
    return entries.map((entry, index) => {
      const { origin, translation, isEditing } = entry;
      return (
        <TableRow key={index}>
          <TableRowColumn>
            {isEditing
              ? <TextField onChange={this.onEditOriginInputChanged(index)} defaultValue={origin} />
              : <Paper style={{ padding: '5px' }} zDepth={1}>{origin}</Paper>
            }
          </TableRowColumn>
          <TableRowColumn>
            {isEditing
              ? <TextField onChange={this.onEditTranslationInputChanged(index)} defaultValue={translation} />
              : <Paper style={{ padding: '5px' }} zDepth={1}>{translation}</Paper>
            }
          </TableRowColumn>
          <TableRowColumn>
            <FlatButton icon={isEditing ? <ActionDoneIcon /> : <EditorModeEditIcon />}
                        onClick={this.onEditButtonClick(index)} />
            <FlatButton icon={<ActionDeleteIcon />}
                        onClick={this.onRemoveButtonClick(index)} />
          </TableRowColumn>
        </TableRow>
      );
    });
  };


  render() {
    const style = {
      margin: 12,
    };
    return (
      <div>
        <RaisedButton style={style} label="Save" onClick={() => {
          // TODO: implement
        }} />

        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Origin</TableHeaderColumn>
              <TableHeaderColumn>Translation</TableHeaderColumn>
              <TableHeaderColumn> </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderEntries()}
            <TableRow>
              <TableRowColumn>
                <TextField hintText="Enter new origin" ref={this.originRef} onChange={this.onAddOriginInputChanged} />
              </TableRowColumn>
              <TableRowColumn>
                <TextField hintText="Enter relevant translation" onChange={this.onAddTranslationInputChanged} />
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
