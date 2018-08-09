import React, { Component } from 'react';
import Aux from '../../HOC/aux_x'
import Navbar from '../Navbar/Navbar';
import ProductContainer from '../ProductContainer/ProductContainer';
import ProductDetails from '../ProductDetails/ProductDetails';
import classes from './MainCore.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import RegisterModul from '../RegisterModul/RegisterModul';
import LoginModule from '../LoginModule/LoginModule';

import { connect } from 'react-redux'
import Spinner from '../../UI/Spinner/Spinner';


class MainCore extends Component {
  state = {
    showPanel: false
  }
  showPanelToggle = () => {
    this.setState({showPanel: !this.state.showPanel})
  }

  render() {
    return (
      <Aux>
        <button className={classes.showPanel} onClick={this.showPanelToggle}>Pokaz panel</button>
        {this.state.showPanel ? 
        <div className={classes.Panel}>
          <NavLink className={classes.CreateAccount} to="/create-account">Zaloz konto</NavLink>
          <NavLink className={classes.Loggin} to="/loggin">Zaloguj sie</NavLink> 
        </div>
        : null }
        <Switch>
          <Route path='/create-account' exact component={RegisterModul} /> 
          <Route path='/loggin' component={LoginModule} /> 
        </Switch>
        
        {this.props.loading.loading ? <Spinner/> : null }

        <Navbar/>
        <ProductDetails/>
        <ProductContainer/>
      </Aux>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.auctionList,
});


export default connect(mapStateToProps)(MainCore);
