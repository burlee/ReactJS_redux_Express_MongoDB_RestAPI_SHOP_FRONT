import React, { Component } from 'react';
import classes from '../ProductDetails/ProductDetails.css';
import { connect } from 'react-redux';
import {DebounceInput} from 'react-debounce-input';
import { search_by_price, search_by_price_more} from '../../Redux/actions/Actions';


class ProductDetails extends Component {
  state = {
    searchPrice: '',
    searchPriceMore: '',
    checkedNew: false,
    checkedUsed: false
  }
  
  searchByPrice = () => {
    if(this.state.searchPrice === '' || this.state.searchPrice === 0) return;
    this.props.search_by_price(parseFloat(this.state.searchPrice), this.state.checkedNew, this.state.checkedUsed );
    this.setState({searchPrice: ''})
  }

  searchByPriceMore = () => {
    if(this.state.searchPriceMore === '' || this.state.searchPriceMore === 0) return;
    this.props.search_by_price_more(parseFloat(this.state.searchPriceMore), this.state.checkedNew, this.state.checkedUsed);
    this.setState({searchPriceMore: ''})
  }

  NewOptionChecked = () => {
    this.setState({checkedNew: !this.state.checkedNew, checkedUsed: false})
  }

  UsedOptionChecked = () => {
    this.setState({checkedUsed: !this.state.checkedUsed, checkedNew: false})
  }

  render() {
    return (
      
      <div className={classes.ProductDetails}>
        <h5>Personalizuj swoją cenę:</h5>
        <div className={classes.FillteredBox}>
          <span>Mniej niż(pln):</span>
          <DebounceInput
            value={this.state.searchPrice}
            minLength={1}
            debounceTimeout={300}
            onChange={event => this.setState({searchPrice: event.target.value})} />
          <button onClick={this.searchByPrice}>Szukaj po cenie</button>
        </div>
        <div className={classes.FillteredBox}>
          <span>Więcej niż niż(pln):</span>
          <DebounceInput
            value={this.state.searchPriceMore}
            minLength={1}
            debounceTimeout={300}
            onChange={event => this.setState({searchPriceMore: event.target.value})} />
          <button onClick={this.searchByPriceMore}>Szukaj po cenie</button>
        </div>
        <div className={classes.ConditionBox}>
          <span>Wybierz stan:</span>
            <div className={classes.ConditionBoxLabel}>
              <label htmlFor="new">Nowy</label>
              <input checked={this.state.checkedNew} onClick={this.NewOptionChecked} id="new" type="checkbox"/>
            </div>
            <div className={classes.ConditionBoxLabel}>
              <label htmlFor="used">Używany</label>
              <input checked={this.state.checkedUsed} onClick={this.UsedOptionChecked} id="used" type="checkbox"/>
            </div>
        </div>
      </div>
    )
  }
}



export default connect(null, { search_by_price, search_by_price_more })(ProductDetails);
