import React, { Component } from 'react';
import classes from './ShopCart.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import Aux from '../../HOC/aux_x'
import ShopCartOrderSummary from './ShopCartOrderSummary/ShopCartOrderSummary';

class ShopCart extends Component {
  
  render() {
    return (
      <Aux>
        <div className={classes.ShopCart}>
          <NavLink to="/order-summary"><i className="fas fa-shopping-cart"></i></NavLink>
        </div>

        <Switch>
          <Route path='/order-summary' exact component={ShopCartOrderSummary} />     
        </Switch>
      </Aux>
    )
  }
}

export default ShopCart;