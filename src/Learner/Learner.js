import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import store from '../utils/store';

import './Learner.css';
import { loadEntries } from "../utils/saveLoadEntries";

class Learner extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      showType: 'both',
      index: 0,
      isRandom: false,
    };
  }

  componentDidMount() {
    const processEntries = (entries) => {
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
    const ent = store.getValue('entries');
    if (!ent) {
      loadEntries().then(processEntries);
    } else {
      processEntries(ent);
    }
  }

  onTypeChanged = (event, value) => {
    this.setState({
      showType: value,
    })
  };

  onRandomChanged = (event, isChecked) => {
    this.setState({
      isRandom: isChecked,
    })
  };

  onClick = (event) => {
    if (event.target === event.currentTarget) {
      this.processClick();
    }

  };

  processClick = () => {
    const { isRandom, entries } = this.state;
    let { index } = this.state;
    if (!isRandom) {
      ++index;
      if (index >= entries.length) {
        index = 0;
      }
    } else {
      index = Math.round(Math.random() * entries.length);
    }
    this.setState({ index })
  };

  renderWords = () => {
    const { entries, showType, index } = this.state;
    const entry = entries[index];
    const style = {
      padding: '10px',
      margin: '10px',
      fontSize: 36,
    };
    let rendered;
    if (entry) {
      switch (showType) {
        case 'both':
          rendered = (
            <React.Fragment>
              <Paper style={style}>{entry.origin}</Paper>
              <Paper style={style}>{entry.translation}</Paper>
            </React.Fragment>
          );
          break;
        case 'origin':
          rendered = (
            <Paper style={style}>{entry.origin}</Paper>
          );
          break;
        case 'translation':
          rendered = (
            <Paper style={style}>{entry.translation}</Paper>
          );
          break;
        default:
          rendered = (<div />)
      }
    } else {
      rendered = (<div />)
    }
    return rendered
  };

  render() {
    const styles = {
      radio: {
        margin: 5,
        width: 'initial',
        display: 'inline-block'
      },
      checkbox: {
        margin: 5,
        width: 'initial',
        display: 'inline-block'
      }
    };
    return (
      <div onClick={this.onClick} style={{ height: '100%', width: '100%', position: 'absolute' }}>
        <RadioButtonGroup name="name" onChange={this.onTypeChanged} defaultSelected="both">
          <RadioButton
            value="both"
            label="Both"
            style={styles.radio}
          />
          <RadioButton
            value="origin"
            label="Origin"
            style={styles.radio}
          />
          <RadioButton
            value="translation"
            label="Translation"
            style={styles.radio}
          />
        </RadioButtonGroup>
        <div>
          <Checkbox
            label="Random"
            style={styles.checkbox}
            onChange={this.onRandomChanged}
          />
          <RaisedButton style={styles.checkbox} fullWidth={false} label="Next" onClick={this.processClick} />
        </div>
        <div>
          {this.renderWords()}
        </div>
      </div>
    );
  }
}

export default Learner;
