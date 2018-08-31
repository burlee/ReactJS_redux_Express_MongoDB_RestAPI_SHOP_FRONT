import React, { Component } from 'react';
import Aux from '../../HOC/aux_x'
import Navbar from '../Navbar/Navbar';
import ProductContainer from '../ProductContainer/ProductContainer';
import ProductDetails from '../ProductDetails/ProductDetails';
import classes from './MainCore.css';
import WarningModal from '../../UI/WarningModal/WarningModal'
import { Switch, Route, NavLink } from 'react-router-dom';
import RegisterModul from '../RegisterModul/RegisterModul';
import LoginModule from '../LoginModule/LoginModule';
import AddProduct from '../AddProduct/AddProduct';
import FirebaseConfig from '../../FirebaseConfig';
import { withRouter } from 'react-router-dom';
import UserAuctionsList from '../UserAuctionsList/UserAuctionsList';
import Messages from '../Messager/Messages/Messages';
import { connect } from 'react-redux';
import UserSettings from '../UserSettings/UserSettings';

class MainCore extends Component {
  state = {
    showPanel: false,
    warningModal: false
  }

  componentDidMount(){
    //this.props.history.push('/');
    document.body.style.overflow = "visible";
  }
  
  
  showPanelToggle = () => {
    this.setState({showPanel: !this.state.showPanel})
  }

  scrollHidden = () => {
    document.body.style.overflow = "hidden";
  }

  closePanelToggle = () => {
    this.setState({showPanel: !this.state.showPanel});
    this.props.history.push('/');
  }

  logOut = () =>{
    FirebaseConfig.auth().signOut();
    this.props.history.push('/');
  }
  
  warningModal = () => {
    this.setState({warningModal: true});
    setTimeout(()=> this.setState({warningModal: false}), 5000);
  }
  render() {
    return (
      <Aux>
        {this.state.showPanel ? null : 
        <button 
          className={classes.showPanelBtn} 
          onClick={this.showPanelToggle}
          >
          Panel Użytkownika
          <i style={{fontSize: '30px', marginRight: '8px'}} className="fas fa-user-alt"></i>
          </button>}
        {this.state.showPanel ? 
          <div className={classes.Panel}>
            <ul>
              {this.props.userExist.userExist !== null ? 
              <Aux>
                <li style={{cursor: 'pointer', color: '#4c4c4c', fontWeight: 'bold'}} onClick={this.logOut}>Wyloguj się</li>
                
                { this.props.userSettings.userSettings === null ? 
                    <li onClick={this.warningModal} style={{cursor: 'pointer', color: '#4c4c4c', fontWeight: 'bold'}}>Dodaj aukcję</li> : 
                    <li><NavLink onClick={this.scrollHidden} to="/add-product">Dodaj aukcję</NavLink></li>
                }
                
                <li><NavLink onClick={this.scrollHidden} to="/auction-list">Lista aukcji</NavLink></li>
                <li><NavLink onClick={this.scrollHidden} to="/messages">Wiadomości <span className={classes.MessageCount}>{this.props.messageCount.messageCount}</span></NavLink></li>
                <li><NavLink onClick={this.scrollHidden} to="/settings">Ustawienia</NavLink></li>
              </Aux>
              :  
              <Aux>
                <li><NavLink onClick={this.scrollHidden} to="/create-account">Załóż konto</NavLink></li>
                <li><NavLink to="/loggin">Zaloguj się</NavLink></li>
              </Aux>
              }
              <li style={{cursor: 'pointer', color: '#4c4c4c', fontWeight: 'bold'}} onClick={this.closePanelToggle}>Zamknij</li>
            </ul>
          </div>
        : null }
        
        <Switch>
          <Route path='/create-account' exact component={RegisterModul} /> 
          <Route path='/add-product' component={AddProduct} />
          <Route path='/auction-list' component={UserAuctionsList} />
          <Route path='/loggin' component={LoginModule} />
          <Route path='/messages' component={Messages} />
          <Route path='/settings' component={UserSettings} />
        </Switch>
        
        <Navbar/>
        <ProductDetails/>
        <ProductContainer/>

        {this.state.warningModal ? <WarningModal/> : null }
      </Aux>
    )
  }
}

const mapStateToProps = state => ({
  userExist: state.auctionList,
  messageCount: state.auctionList,
  userSettings: state.auctionList
});

export default withRouter(connect(mapStateToProps)(MainCore));