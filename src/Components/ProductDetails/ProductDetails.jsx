import React, { Component } from 'react';
import classes from '../ProductDetails/ProductDetails.css';
import { connect } from 'react-redux';
import {DebounceInput} from 'react-debounce-input';
import { search_by_price } from '../../Redux/actions/Actions';


class ProductDetails extends Component {
  state = {
    searchPrice: 0
  }
  
  searchByPrice = () => {
    this.props.search_by_price(parseFloat(this.state.searchPrice));
  }
  render() {
    return (
      <div className={classes.ProductDetails}>
        <h5>Personalizuj swoją cenę:</h5>
        <div className={classes.FillteredBox}>
          <span>Mniej niż(pln):</span>
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            onChange={event => this.setState({searchPrice: event.target.value})} />
          <button onClick={this.searchByPrice}>Szukaj po cenie</button>
        </div>
      </div>
    )
  }
}



export default connect(null, {search_by_price})(ProductDetails);
