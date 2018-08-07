import React, { Component } from 'react';
import classes from './Basket.css';

export default class Basket extends Component {
  render() {
    return (
      <div className={classes.Basket}>
        <p>Zobacz zawartość swojego koszyka</p>
        <div className={classes.BasketValue}>1</div>
      </div>
    )
  }
}
