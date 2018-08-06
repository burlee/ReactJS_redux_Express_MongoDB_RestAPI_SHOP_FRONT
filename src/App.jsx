import React, { Component } from 'react';
import Aux from './HOC/aux_x';
// import { Provider } from 'react-redux';
//Redux
// import store from './Store'

class App extends Component {

  render() {
    return (
      <Aux>
        {/* <Provider store={store}> */}
          <p> HELLO </p>
        {/* </Provider> */}
      </Aux>
    );
  }
}

export default App;
