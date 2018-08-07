import React, { Component } from 'react';
import classes from './ProductContainer.css';
import Basket from '../Basket/Basket';
import axios from 'axios'
import ProductDisplay from './ProductDisplay/ProductDisplay';
import PropTypes from 'prop-types'
import Spinner from '../../UI/Spinner/Spinner';
//REDUX
import { connect } from 'react-redux';
import { fetch_all_products } from '../../Redux/actions/Actions'


class ProductContainer extends Component {

  componentDidMount(){
    this.props.fetch_all_products();
  }
  // componentDidMount(){
  //   axios.get('http://localhost:3000/offers')
  //     .then( response => {
  //         const updateProductList = [];
  //         const productFromDB = response.data.products;
  //         for(let key in productFromDB){
  //             updateProductList.push({
  //               id: productFromDB[key].id,
  //               productName: productFromDB[key].productName,
  //               productPrice: productFromDB[key].productPrice
  //             })
  //         }
  //         this.setState({ productsList: updateProductList })
  //     })
  // }

  render() {
    const allProductsFromDB = this.props.allProducts.allProducts;
    let displayAllProduct = null;
    displayAllProduct = allProductsFromDB.map( product => {
      return <ProductDisplay
                key={product.id}
                productName={product.productName}
                productPrice={product.productPrice}
            />
    })

    return (
      <div className={classes.ProductContainer}>
        <Basket/>
        {this.props.loading.loading ? <Spinner/> : null}
        {displayAllProduct}
      </div>
    )
  }
}

ProductContainer.propTypes = {
  fetch_all_products: PropTypes.func.isRequired,
  allProducts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  allProducts: state.auctionList,
  loading: state.auctionList
});

export default connect(mapStateToProps, {fetch_all_products} )(ProductContainer);