import React, { Component } from 'react'
import classes from './LastAddedProduct.css'
import { connect } from 'react-redux'
import { fetch_last_15_products_from_db } from '../../Redux/actions/Actions'


class LastAddedProduct extends Component {
    state = {
        nextProductVal: 3,
        productPrevious: 0,
        productsArrayLength: 15
    }


    componentDidMount() {
        this.props.fetch_last_15_products_from_db();

        setInterval(() => {

            const oldproductPrevious = this.state.productPrevious;
            this.setState({ productPrevious: oldproductPrevious + 1 });
            if (this.state.productsArrayLength - 2 === this.state.productPrevious) { this.setState({ productPrevious: 0 }) };

        }, 5000);
    }


    render() {

        const arrayLength = this.props.last15products.last15products.length - this.state.productPrevious;
        const arrayReverse = arrayLength - 3;
        
        let lastAddedProduct = this.props.last15products.last15products.slice(arrayReverse, arrayLength)
            .map( ({id, productName, productImgUrl, productPrice}) => {

            return (
                <div key={id} className={classes.productDisplay}>
                    <h4>{productName}</h4>
                    <img src={productImgUrl} alt={productName} />
                    <h5>{productPrice.toFixed(2)} PLN</h5>
                </div>)
            })

            return (
                <div className={classes.LastAddedProductContainer}>
                    <h1>Ostatnio dodane produkty</h1>
                    <div className={classes.productContainer}>
                        {lastAddedProduct}
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    last15products: state.auctionList,
    loading: state.auctionList
});

export default connect(mapStateToProps, { fetch_last_15_products_from_db })(LastAddedProduct);
