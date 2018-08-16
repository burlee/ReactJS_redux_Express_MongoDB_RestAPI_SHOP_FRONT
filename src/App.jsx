import React, { Component } from 'react';
import MainCore from './Components/MainCore/MainCore';
import classes from './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './Redux/Store'
import LastAddedProduct from './Components/LastAddedProduct/LastAddedProduct';
import Footer from './Components/Footer/Footer';

class App extends Component {

  render() {
    return (
        <Provider store={store}> 
            <div className={classes.App}>
              <MainCore/>
              <LastAddedProduct/>
              <Footer/>
            </div>
        </Provider> 
    );
  }
}

export default App;