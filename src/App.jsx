import React, { Component } from 'react';
import MainCore from './Components/MainCore/MainCore';
import classes from './App.css'
import { Provider } from 'react-redux';
//Redux
import store from './Redux/Store'

class App extends Component {

  render() {
    return (
      <Provider store={store}> 
        <div className={classes.App}>
          <MainCore/>
        </div>
      </Provider> 
    );
  }
}

export default App;
