import React, { Component } from 'react';
import classes from './ProductContainer.css';
import ShopCart from '../ShopCart/ShopCart';
import ProductDisplay from './ProductDisplay/ProductDisplay';
import PropTypes from 'prop-types'
import Spinner from '../../UI/Spinner/Spinner';
//REDUX
import { connect } from 'react-redux';
import { fetch_all_products } from '../../Redux/actions/Actions'


class ProductContainer extends Component {
  state = {
    shopCartIsEmpty: localStorage.getItem('Order'),
    productDisplayHeigth: 250,
    productDisplayWidth: 100,
    flexDirection: 'row'
  }

  componentDidMount(){
    this.props.fetch_all_products();

    if(this.state.shopCartIsEmpty === null ){
      localStorage.setItem('Order', JSON.stringify([]));
    }
  }

  changeSizeToggle = () => {
    if(this.state.productDisplayWidth === 45){
      this.setState({
        productDisplayWidth: 100,
        flexDirection: 'row',
        productDisplayHeigth: 250
      })
    }
    if(this.state.productDisplayWidth === 100){
      this.setState({
        productDisplayWidth: 45,
        flexDirection: 'column',
        productDisplayHeigth: 250
      })
    }
  }
  
  render() {

    const allProductsFromDB = this.props.allProducts.allProducts;
    let displayAllProduct = null;

    displayAllProduct = allProductsFromDB.map( product => {
      return <ProductDisplay
                productDisplayWidth={this.state.productDisplayWidth}
                flexDirection={this.state.flexDirection}
                productDisplayHeigth={this.state.productDisplayHeigth}
                key={product.id}
                id={product.id}
                productName={product.productName}
                productPrice={product.productPrice}
                productImgUrl={product.productImgUrl}
            />
    })

    return (
      <div className={classes.ProductContainer}>
        <ShopCart/>
        <button onClick={this.changeSizeToggle}>Zmien wyswietlanie</button>
        {this.props.loading.loading ? <Spinner/> : null}
        <div className={classes.ProductContainerFlexBox}>
          {displayAllProduct}
        </div>
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