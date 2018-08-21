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
import FirebaseConfig from '../../FirebaseConfig';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserAuctionsList from '../UserAuctionsList/UserAuctionsList';

class MainCore extends Component {
  state = {
    showPanel: false
  }

  componentDidMount(){
    // this.props.history.push('/');
    document.body.style.overflow = "visible";
  }
  
  showPanelToggle = () => {
    this.setState({showPanel: !this.state.showPanel})
  }

  scrollHidden = () => {
    document.body.style.overflow = "hidden";
  }

  closePanelToggle = () => {
    this.setState({showPanel: !this.state.showPanel})
    this.props.history.push('/')
  }

  logOut = () =>{
    FirebaseConfig.auth().signOut();
    this.props.history.push('/')
  }

  render() {
    return (
      <Aux>
        {this.state.showPanel ? null : <button className={classes.showPanel} onClick={this.showPanelToggle}>Pokaz panel</button>}
        {this.state.showPanel ? 
          <div className={classes.Panel}>
            <ul>
              {this.props.userExist.userExist !== null ? 
              <Aux>
                <li style={{cursor: 'pointer'}} onClick={this.logOut}>Wyloguj się</li>
                <li><NavLink onClick={this.scrollHidden} to="/add-product">Dodaj produkt</NavLink></li>
                <li><NavLink onClick={this.scrollHidden} to="/auction-list">List aukcji</NavLink></li>
              </Aux>
              :  
              <Aux>
                <li><NavLink onClick={this.scrollHidden} to="/create-account">Załóż konto</NavLink></li>
                <li><NavLink to="/loggin">Zaloguj się</NavLink></li>
              </Aux>
              }
              <li style={{cursor: 'pointer'}} onClick={this.closePanelToggle}>Zamknij Panel</li>
            </ul>
          </div>
        : null }
        <Switch>
          <Route path='/create-account' exact component={RegisterModul} /> 
          <Route path='/add-product' component={AddProduct} />
          <Route path='/auction-list' component={UserAuctionsList} />
          <Route path='/loggin' component={LoginModule} />
        </Switch>
        
        <Navbar/>
        <ProductDetails/>
        <ProductContainer/>
      </Aux>
    )
  }
}

const mapStateToProps = state => ({
  userExist: state.auctionList
});

export default withRouter(connect(mapStateToProps)(MainCore));