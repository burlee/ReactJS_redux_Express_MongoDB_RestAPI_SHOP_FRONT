import React, { Component } from 'react';
import Aux from '../../HOC/aux_x'
import Navbar from '../Navbar/Navbar';
import ProductContainer from '../ProductContainer/ProductContainer';
import ProductDetails from '../ProductDetails/ProductDetails';
import classes from './MainCore.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import RegisterModul from '../RegisterModul/RegisterModul';
import LoginModule from '../LoginModule/LoginModule';
import AddProduct from '../AddProduct/AddProduct';


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

  ClosePanel = () => {
    this.setState({showPanel: false})
  }
  render() {
    return (
      <Aux>
        <button className={classes.showPanel} onClick={this.showPanelToggle}>Pokaz panel</button>
        {this.state.showPanel ? 
        <div className={classes.Panel}>
          <ul>
            <li><NavLink onClick={this.scrollHidden} to="/create-account">Zaloz konto</NavLink></li>
            <li><NavLink onClick={this.scrollHidden} to="/add-product">Dodaj produkt</NavLink></li>
            <li><NavLink to="/loggin">Zaloguj sie</NavLink></li>
            <li onClick={this.ClosePanel}>Zamknij Panel</li>
          </ul>
        </div>
        : null }
        <Switch>
          <Route path='/create-account' component={RegisterModul} /> 
          <Route path='/add-product' component={AddProduct} />
          <Route path='/loggin' component={LoginModule} /> 
        </Switch>
        
        <Navbar/>
        <ProductDetails/>
        <ProductContainer/>
      </Aux>
    )
  }
}
