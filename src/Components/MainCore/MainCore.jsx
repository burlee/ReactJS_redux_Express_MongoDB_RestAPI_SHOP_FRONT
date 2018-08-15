import React, { Component } from 'react';
import Aux from '../../HOC/aux_x'
import Navbar from '../Navbar/Navbar';
import ProductContainer from '../ProductContainer/ProductContainer';
import ProductDetails from '../ProductDetails/ProductDetails';
import classes from './MainCore.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import RegisterModul from '../RegisterModul/RegisterModul';
import LoginModule from '../LoginModule/LoginModule';
import LastAddedProduct from '../LastAddedProduct/LastAddedProduct';


export default class MainCore extends Component {
  state = {
    showPanel: false
  }
  showPanelToggle = () => {
    this.setState({showPanel: !this.state.showPanel})
  }

  scrollHidden = () => {
    document.body.style.overflow = "hidden";
  }

  render() {
    return (
      <Aux>
        <button className={classes.showPanel} onClick={this.showPanelToggle}>Pokaz panel</button>
        {this.state.showPanel ? 
        <div className={classes.Panel}>
          <NavLink onClick={this.scrollHidden} className={classes.CreateAccount} to="/create-account">Zaloz konto</NavLink>
          <NavLink className={classes.Loggin} to="/loggin">Zaloguj sie</NavLink> 
        </div>
        : null }
        <Switch>
          <Route path='/create-account' exact component={RegisterModul} /> 
          <Route path='/loggin' component={LoginModule} /> 
        </Switch>
        
        <Navbar/>
        <ProductDetails/>
        <ProductContainer/>
      </Aux>
    )
  }
}
