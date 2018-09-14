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
import { CirclePicker } from 'react-color';
import Orders from '../Orders/Orders';


class MainCore extends Component {
  state = {
    showPanel: false,
    warningModal: false,
    showColorPicker: false,
    panelBgColor: localStorage.getItem('panelBgColor'),
    colors: ['#fafafa', "#e2e2e2"]
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
    window.location.reload();
  }
  
  warningModal = () => {
    this.setState({warningModal: true});
    setTimeout(()=> this.setState({warningModal: false}), 5000);
  }

  showColorPicker = () => {
    this.setState({showColorPicker: !this.state.showColorPicker})
  }

  colorHandler = (color) => {
    this.setState({ panelBgColor: color.hex });
    localStorage.setItem('panelBgColor', color.hex)
  }

  render() {
    return (
      <Aux>
        {this.state.showPanel ? null : 
        <button className={classes.showPanelBtn} onClick={this.showPanelToggle}>
          Panel Użytkownika
          <i style={{fontSize: '30px', marginRight: '8px'}} className="fas fa-user-alt"></i>
        </button>}
        {this.state.showPanel ? 
          <nav className={classes.Panel} style={{backgroundColor: this.state.panelBgColor}}>
            
            {this.state.showColorPicker ? 
            <div className={classes.ColorPicker}>
              <CirclePicker width='auto' colors={this.state.colors} onChange={this.colorHandler} />
            </div> : null }

            <ul>
              {this.props.userExist.userExist !== null ? 
              <Aux>
                <li style={{cursor: 'pointer', color: '#4c4c4c', fontWeight: 'bold'}} onClick={this.showColorPicker}>Dostosuj kolor</li>
                <li style={{cursor: 'pointer', color: '#4c4c4c', fontWeight: 'bold'}} onClick={this.logOut}>Wyloguj się</li>

                { this.props.userSettings.userPaymentSettings === null ||
                  this.props.userSettings.userPersonalDetails === null ? 
                    <li onClick={this.warningModal} style={{cursor: 'pointer', color: '#4c4c4c', fontWeight: 'bold'}}>Dodaj aukcję</li> : 
                    <li><NavLink onClick={this.scrollHidden} to="/add-product">Dodaj aukcję</NavLink></li>
                }
                <li><NavLink onClick={this.scrollHidden} to="/orders">Zamówienia</NavLink></li>
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
          </nav>
        : null }
        
        <Switch>
          <Route path='/create-account' exact component={RegisterModul} /> 
          <Route path='/add-product' component={AddProduct} />
          <Route path='/auction-list' component={UserAuctionsList} />
          <Route path='/loggin' component={LoginModule} />
          <Route path='/orders' component={Orders} />
          <Route path='/messages' component={Messages} />
          <Route path='/settings' component={UserSettings} />
        </Switch>
        
        <Navbar bgColor={this.state.panelBgColor}/>
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