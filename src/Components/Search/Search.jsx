import React, { Component } from 'react';
import classes from './Search.css';
import { DebounceInput } from 'react-debounce-input';

export default class Search extends Component {
  render() {
    return (
        <div className={classes.Search}>
        <DebounceInput
            minLength={2}
            debounceTimeout={300}
            onChange={event => this.setState({ searchTerm: event.target.value })} />
        <button>Szukaj</button>
    </div>
    )
  }
}
