import React, { Component } from 'react';
import Aux from '../../HOC/aux_x'
import Navbar from '../Navbar/Navbar';
import ProductContainer from '../ProductContainer/ProductContainer';
import ProductDetails from '../ProductDetails/ProductDetails';
import classes from './MainCore.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import RegisterModul from '../RegisterModul/RegisterModul';
import LoginModule from '../LoginModule/LoginModule';


export default class MainCore extends Component {
  render() {
    return (
      <Aux>
        <NavLink className={classes.CreateAccount} to="/create-account">Zaloz konto</NavLink>
        <NavLink className={classes.Loggin} to="/loggin">Zaloguj sie</NavLink>
        <Switch>
          <Route path='/create-account' component={RegisterModul} /> 
          <Route path='/loggin' component={LoginModule} /> 
        </Switch>
        
        
        <Navbar/>
        <ProductDetails/>
        <ProductContainer/>
      </Aux>
    )
  }
}
