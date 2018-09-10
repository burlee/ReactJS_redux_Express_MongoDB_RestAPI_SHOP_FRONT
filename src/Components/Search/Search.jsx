import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { connect } from 'react-redux';
import { search_product_in_db } from '../../Redux/actions/Actions';
import classes from './Search.css';

class Search extends Component {
  state = {
    searchTerm: '',
    placeholder: `Wyszukaj produktu...`
  }
  
  pressEnter = (event) => {
    
    if(this.state.searchTerm.length === '') return;

    if (event.key === 'Enter') {

      if(this.state.searchTerm.length < 4){
        this.setState({placeholder: `Wyraz jest za krótki...`})
      }else{this.setState({placeholder: `Wyszukaj produktu...` })}

      this.setState({searchTerm: ''})
      this.props.search_product_in_db(this.state.searchTerm);
    }
  }
  render() { 
    const productsCounter = this.state.placeholder;
    return (
        <div className={classes.Search} style={{background: this.props.bgColor}}>
          <DebounceInput
              value={this.state.searchTerm}
              onKeyPress={this.pressEnter}
              minLength={2}
              debounceTimeout={100}
              placeholder={productsCounter}
              onChange={event => this.setState({ searchTerm: event.target.value })} />
          {this.state.searchTerm.length >= 4 ? 
            <button 
              onClick={() => this.props.search_product_in_db(this.state.searchTerm)}
              >
              <i className="fas fa-angle-right" style={{fontSize: '28px', color: '#4c4c4c'}}></i>
            </button>
          : 
            <button 
              onClick={() => this.props.search_product_in_db(this.state.searchTerm)}
              >
              <i className="fas fa-angle-right" style={{fontSize: '28px', color: '#e2e2e2'}}></i>
            </button>
          }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.auctionList
});

export default connect(mapStateToProps, { search_product_in_db })(Search)