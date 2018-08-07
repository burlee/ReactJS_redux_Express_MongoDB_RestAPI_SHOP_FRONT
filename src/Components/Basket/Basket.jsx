import React, { Component } from 'react';
import classes from './Basket.css';
// import { connect } from 'react-redux';

export default class Basket extends Component {
  render() {
    return (
      <div className={classes.Basket}>
        <div className={classes.BasketValue}>1</div>
      </div>
    )
  }
}
