import React, { Component } from 'react';
import classes from './Search.css';
import { DebounceInput } from 'react-debounce-input';
import { connect } from 'react-redux';


class Search extends Component {
  
  render() { 
    const productsCounter = `Wyszukaj posrod ${this.props.allProducts.allProducts.length}`;
    return (
        <div className={classes.Search}>
        <DebounceInput
            minLength={2}
            debounceTimeout={300}
            placeholder={productsCounter}
            onChange={event => this.setState({ searchTerm: event.target.value })} />
        <button>Szukaj </button>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.auctionList
});

export default connect(mapStateToProps)(Search)