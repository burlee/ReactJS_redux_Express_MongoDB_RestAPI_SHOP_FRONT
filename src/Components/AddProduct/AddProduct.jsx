import React, { Component } from 'react'
import classes from './AddProduct.css'
import { DebounceInput } from 'react-debounce-input'

class AddProduct extends Component {
    state = {
        productTitle: '',
        imgURL: ''
    }

    imgURL = (event) => {
        this.setState({imgURL: event.target.value})
        console.log( event.target.value)
    }

    productTitle = (event) => {
        this.setState({ productTitle: event.target.value.slice(0,50)})
        
    }

    render() {
        return (
            <div className={classes.AddProduct}>
                <div className={classes.productTitle}>
                    <label htmlFor="productTitle">Wprowadź tytuł:</label>
                    <input 
                        value={this.state.productTitle}
                        type="text" 
                        onChange={(event) => this.productTitle(event)}/>
                    <span>Ilość znakow : {this.state.productTitle.length}/50</span>
                </div>
                {/* <img src={this.state.imgURL} alt=""/> */}
            </div>
        )
    }
}


export default AddProduct;
