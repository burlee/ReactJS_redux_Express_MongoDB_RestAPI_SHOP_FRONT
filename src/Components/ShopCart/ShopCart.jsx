import React, { Component } from 'react';
import classes from './ShopCart.css';
import { NavLink, Switch, Route, withRouter } from 'react-router-dom';
import Aux from '../../HOC/aux_x'
import ShopCartOrderSummary from './ShopCartOrderSummary/ShopCartOrderSummary';
import { connect } from 'react-redux';

class ShopCart extends Component {
  
  render() {
    return (
      <Aux>
        <div className={classes.ShopCart}>
          <NavLink to="/order-summary">
          <i className="fas fa-shopping-cart"></i> 
          Koszyk({this.props.allProducts.shopcartProductCounter})
          </NavLink>
        </div>
        <Switch>
          <Route path='/order-summary' exact component={ShopCartOrderSummary} />     
        </Switch>
      </Aux>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.auctionList
});

export default withRouter(connect(mapStateToProps)(ShopCart));