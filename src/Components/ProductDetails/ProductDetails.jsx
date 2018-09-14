import React, { Component } from 'react';
import classes from '../ProductDetails/ProductDetails.css';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { search_by_price, search_by_price_more } from '../../Redux/actions/Actions';


class ProductDetails extends Component {
  state = {
    searchPrice: '',
    searchPriceMore: '',
    checkedNew: false,
    checkedUsed: false,
    selectedCategory: '',
    disabledCheckInput: false
  }

  searchByPrice = () => {
    if (this.state.searchPrice === '' || this.state.searchPrice === 0) return;
    this.props.search_by_price(parseFloat(this.state.searchPrice), this.state.checkedNew, this.state.checkedUsed, this.state.selectedCategory);
    this.setState({ searchPrice: '' })
  }

  searchByPriceMore = () => {
    if (this.state.searchPriceMore === '' || this.state.searchPriceMore === 0) return;
    this.props.search_by_price_more(parseFloat(this.state.searchPriceMore), this.state.checkedNew, this.state.checkedUsed, this.state.selectedCategory);
    this.setState({ searchPriceMore: '' })
  }

  NewOptionChecked = () => {
    this.setState({ checkedNew: !this.state.checkedNew, checkedUsed: false })
  }

  UsedOptionChecked = () => {
    this.setState({ checkedUsed: !this.state.checkedUsed, checkedNew: false })
  }

  selectedCategoryHandler = (event) =>{
    if(event.target.value === 'Oferta pracy'){
      this.setState({selectedCategory: event.target.value, disabledCheckInput: true})
    }else(this.setState({selectedCategory: event.target.value, disabledCheckInput: false}))
    
  }

  render() {
    return (
      <aside className={classes.ProductDetails}>
        <h5>Personalizuj swoje ustawienia</h5>
        <div className={classes.FillteredBox}>
          <label htmlFor="lessThanInput">Mniej niż:</label>
          <DebounceInput
            id="lessThanInput"
            value={this.state.searchPrice}
            minLength={1}
            debounceTimeout={300}
            onChange={event => this.setState({ searchPrice: event.target.value })} />
          <button onClick={this.searchByPrice}>Szukaj</button>
        </div>
        <div className={classes.FillteredBox}>
          <label htmlFor="moreThanInput">Więcej niż niż:</label>
          <DebounceInput
            id="moreThanInput"
            value={this.state.searchPriceMore}
            minLength={1}
            debounceTimeout={300}
            onChange={event => this.setState({ searchPriceMore: event.target.value })} />
          <button onClick={this.searchByPriceMore}>Szukaj</button>
        </div>
        <div className={classes.ConditionBox}>
          <span>Wybierz stan:</span>
          <div className={classes.ConditionBoxLabel}>
            <label htmlFor="new">Nowy</label>
            <input checked={this.state.checkedNew} disabled={this.state.disabledCheckInput} onClick={this.NewOptionChecked} id="new" type="checkbox" />
          </div>
          <div className={classes.ConditionBoxLabel}>
            <label htmlFor="used">Używany</label>
            <input checked={this.state.checkedUsed} disabled={this.state.disabledCheckInput} onClick={this.UsedOptionChecked} id="used" type="checkbox" />
          </div>
        </div>
        <div className={classes.ConditionBox}>
          <label htmlFor="category">Wybierz kategorię:</label>
          <select id="category" onChange={this.selectedCategoryHandler} required>
            <option value="">Wszystkie</option>
            <option value="Odzież">Odzież</option>
            <option value="Elektronika">Elektronika</option>
            <option value="Samochody">Samochody</option>
            <option value="Wyposażenie domu">Wyposażenie domu</option>
            <option value="Oferta pracy">Oferty pracy</option>
            <option value="Inne">Inne</option>
          </select>
        </div>
        {/* <div className={classes.SponsorOffer}>
          <span>Sponsorowane</span>
        </div> */}
      </aside>
    )
  }
}



export default connect(null, { search_by_price, search_by_price_more })(ProductDetails);
