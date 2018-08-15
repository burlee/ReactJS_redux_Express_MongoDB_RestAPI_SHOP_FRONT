import React, { Component } from 'react'
import classes from './LastAddedProduct.css'
import {connect} from 'react-redux'

class LastAddedProduct extends Component {
  render() {

    const arrayLength = this.props.allProducts.allProducts.length;
    const arrayReverse = arrayLength - 3;
    console.log( arrayReverse )
    console.log( arrayLength )

    let lastAddedProduct = this.props.allProducts.allProducts.slice(arrayReverse, arrayLength).map( product => {
        return (
        <div key={product.id} className={classes.productDisplay}>
            <span>{product.productName}</span>
            <img src={product.productImgUrl} alt={product.productName}/>
            <span>{product.productPrice} PLN</span>
        </div>)
    })
    return (
      <div className={classes.LastAddedProductContainer}>
        <h1>Ostatnio dodane produkty</h1>
        <div className={classes.productContainer}>
            <button>&gt;</button>
                {lastAddedProduct}
            <button>&lt;</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    allProducts: state.auctionList,
    loading: state.auctionList
});

export default connect(mapStateToProps)(LastAddedProduct);
