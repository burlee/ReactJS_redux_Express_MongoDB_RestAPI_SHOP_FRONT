import React, { Component } from 'react'
import classes from './LastAddedProduct.css'
import { connect } from 'react-redux'
import axios from 'axios'

class LastAddedProduct extends Component {
    state = {
        nextProductVal: 3,
        productPrevious: 0,
        backBtnDisabled: true,
        nextBtnDiabled: false,
        productsArrayLength: 0
    }
    
    
    componentDidMount(){
        axios.get('http://localhost:3000/offers/')
            .then( response => {
                this.setState({productsArrayLength: response.data.count})
            })
    
    }

    nextProduct = () => {
        const oldproductPrevious = this.state.productPrevious;
        this.setState({
            productPrevious: oldproductPrevious  + 1
        })
        if(this.state.productPrevious >= 0){
            this.setState({backBtnDisabled: false})
        }
        if(this.state.productsArrayLength - 4 === this.state.productPrevious){
            this.setState({nextBtnDiabled: true})
        }
    }

    backProduct = () => {
        const oldproductPrevious = this.state.productPrevious;
        this.setState({
            productPrevious: oldproductPrevious  - 1
        })
        if(this.state.productPrevious <= 1){
            this.setState({backBtnDisabled: true})
        }
        if(this.state.productsArrayLength - 4 < this.state.productPrevious){
            this.setState({nextBtnDiabled: false})
        }
    }

    render() {

        const arrayLength = this.props.allProducts.allProducts.length - this.state.productPrevious;
        const arrayReverse = arrayLength - 3;

        let lastAddedProduct = this.props.allProducts.allProducts.slice(arrayReverse, arrayLength).map(product => {
            return (
                <div key={product.id} className={classes.productDisplay}>
                    <span>{product.productName}</span>
                    <img src={product.productImgUrl} alt={product.productName} />
                    <span>{product.productPrice} PLN</span>
                </div>)
        })

        return (
            <div className={classes.LastAddedProductContainer}>
                <h1>Ostatnio dodane produkty</h1>
                <div className={classes.productContainer}>
                    <button disabled={this.state.nextBtnDiabled} onClick={this.nextProduct}>&gt;</button>
                    {lastAddedProduct}
                    <button disabled={this.state.backBtnDisabled} onClick={this.backProduct}>&lt;</button>
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
