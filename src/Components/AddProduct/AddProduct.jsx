import React, { Component } from 'react'
import classes from './AddProduct.css'
import axios from 'axios'

class AddProduct extends Component {
    state = {
        productTitle: '',
        imgURL: '',
        category: ''    
    }

    imgURL = (event) => {
        this.setState({imgURL: event.target.value})
        console.log( event.target.value)
    }

    productTitle = (event) => {
        this.setState({ productTitle: event.target.value.slice(0,50)})
        
    }

    selectedCategory = (category) => {
        switch(category){
            case "Elektronika": {
                if(this.state.category === 'Elektronika'){
                    this.setState({
                        category: ''})
                }else{
                    this.setState({
                        category: 'Elektronika'
                    })
                }
                break;
            }
            case "Odzież": {
                if(this.state.category === 'Odzież'){
                    this.setState({
                        category: ''})
                }else{
                    this.setState({
                        category: 'Odzież'
                    })
                }
                break;
            }
            case "Samochody":{
                if(this.state.category === 'Samochody'){
                    this.setState({
                        category: ''})
                }else{
                    this.setState({
                        category: 'Samochody'
                    })
                }
                break;
            }
            case "Wyposażenie domu":{
                if(this.state.category === 'Wyposażenie domu'){
                    this.setState({
                        category: ''})
                }else{
                    this.setState({
                        category: 'Wyposażenie domu'
                    })
                }
                break;
            }
            case "Inne": {
                if(this.state.category === 'Inne'){
                    this.setState({
                        category: ''})
                }else{
                    this.setState({
                        category: 'Inne'
                    })
                }
            }
            
        }
    }

    // Odzież = () => {
    //     if(this.state.category === 'Odzież'){
    //         this.setState({
    //             category: '', 
    //             OdzieżBoxShadowStyle: '#4c4c4c'})
    //     }else{
    //         this.setState({
    //             category: 'Odzież',
    //             OdzieżBoxShadowStyle: 'green'
    //         })
    //     }
        
    //     // const product = {
    //     //     productName: "Ipgdasdasd",
    //     //     productPrice: 2000,
    //     //     productImgUrl: "https://images-na.ssl-images-amazon.com/images/I/71lXJ5AM7yL._SL1500_.jpg",
    //     //     condition: "Nowyy"
    //     // }
    //     // axios.post('http://localhost:3000/offers', product)
    // }
    render() {
        console.log( this.state.productTitle)
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
                <div className={classes.productCategory}>
                    <h1>Wybierz kategorię: </h1> 
                    <span>Wybrana kategoria: {this.state.category}</span>
                    <div className={classes.CategoryBox}>
                        <button onClick={() => this.selectedCategory("Odzież")} style={{boxShadow: `0px 0px 15px ${this.state.OdzieżBoxShadowStyle}`}}>Odzież</button>
                        <button onClick={() => this.selectedCategory("Elektronika")}>Elektronika</button>
                        <button onClick={() => this.selectedCategory("Samochody")}>Samochody</button>
                        <button onClick={() => this.selectedCategory("Wyposażenie domu")}>Wyposażenie domu</button>
                        <button onClick={() => this.selectedCategory("Inne")}>Inne</button>
                    </div>
                </div>
                <div className={classes.productPriceAndImg}>
                    <div className={classes.productPrice}>
                        <span>Podaj cenę:</span>
                        <input type="text" placeholder="Podaj cenę..."/>
                    </div>
                    <div className={classes.productImg}>
                        <span>Podaj url zdjęcia:</span>
                        <input type="text" placeholder="Podaj url zdjęcia..."/>
                    </div>
                </div>
                {/* <img src={this.state.imgURL} alt=""/> */}
            </div>
        )
    }
}


export default AddProduct;
