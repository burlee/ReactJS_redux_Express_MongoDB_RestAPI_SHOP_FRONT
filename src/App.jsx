import React, { Component } from 'react';
import MainCore from './Components/MainCore/MainCore';
import classes from './App.css';
import FirebaseConfig from './FirebaseConfig';
//Redux
import { Provider } from 'react-redux';
import store from './Redux/Store'

class App extends Component {
  // componentDidMount(){
  //   console.log( FirebaseConfig.auth() )
  // }
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