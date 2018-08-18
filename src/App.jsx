import React, { Component } from 'react';
import MainCore from './Components/MainCore/MainCore';
import classes from './App.css';
import LastAddedProduct from './Components/LastAddedProduct/LastAddedProduct';
import Footer from './Components/Footer/Footer';
import CategoryShowcase from './Components/CategoryShowcase/CategoryShowcase';
//Redux
import { Provider } from 'react-redux';
import store from './Redux/Store'

class App extends Component {
  state = {
    showCategories: true
  }

  showCategoriesToggle = () => {
    this.setState({showCategories: !this.state.showCategories})
  }

  render() {
    return (
        <Provider store={store}> 
            <main className={classes.App}>
              <MainCore/>
              <LastAddedProduct/>
              <h1 onClick={this.showCategoriesToggle} className={classes.CategoryHeader}>Wybieraj spośród wielu kategorii</h1>
              {this.state.showCategories ? 
              <CategoryShowcase/> : null }
              <Footer/>
            </main>
        </Provider> 
    );
  }
}

export default App;