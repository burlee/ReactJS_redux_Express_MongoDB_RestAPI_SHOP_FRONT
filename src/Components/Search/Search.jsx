import React, { Component } from 'react';
import classes from './Search.css';
import { DebounceInput } from 'react-debounce-input';
import { connect } from 'react-redux';
import { search_product_in_db } from '../../Redux/actions/Actions'

class Search extends Component {
  state = {
    searchTerm: ''
  }
  
  pressEnter = (event) => {
    if (event.key === 'Enter') {
      this.props.search_product_in_db(this.state.searchTerm);
    }
  }
  render() { 
    const productsCounter = `Wyszukaj produktu...`;
    return (
        <div className={classes.Search}>
        <DebounceInput
            onKeyPress={this.pressEnter}
            minLength={2}
            debounceTimeout={300}
            placeholder={productsCounter}
            onChange={event => this.setState({ searchTerm: event.target.value })} />
        <button onClick={() => this.props.search_product_in_db(this.state.searchTerm)}><i className="fas fa-search"></i></button>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.auctionList
});

export default connect(mapStateToProps, { search_product_in_db })(Search)