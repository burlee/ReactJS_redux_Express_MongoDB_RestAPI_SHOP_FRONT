import React, { Component } from 'react';
import classes from './ShopCart.css';

class ShopCart extends Component {
  render() {
    return (
      <div className={classes.ShopCart}>
        <p>Zobacz zawartość swojego koszyka</p>
          <i className="fas fa-shopping-cart"></i>
      </div>
    )
  }
}



export default ShopCart;