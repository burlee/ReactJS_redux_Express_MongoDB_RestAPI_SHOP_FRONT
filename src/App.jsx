import React, { Component } from 'react';
import Aux from './HOC/aux_x';
import MainCore from './Components/MainCore/MainCore'
// import { Provider } from 'react-redux';
//Redux
// import store from './Store'

class App extends Component {

  render() {
    return (
      <Aux>
        {/* <Provider store={store}> */}
        <MainCore/>
        {/* </Provider> */}
      </Aux>
    );
  }
}

export default App;
