import React, { Component } from 'react'
import classes from './AddProduct.css'
import axios from 'axios'

class AddProduct extends Component {
    state = {
        productPrice: 0,
        productTitle: '',
        imgURL: '',
        imgURLisCorrect: false,
        category: '',
        borderBottomImgUrl: 'gray',
        message: ''
    }

    componentDidMount(){
        document.body.style.overflow = "hidden";
    }

    AddProductToDataBase = () => {
        const state = this.state;
        
        if(state.productPrice !== 0 && state.productTitle !== '' && state.imgURLisCorrect === true && state.category !== ''){
            this.setState({message: 'Twoj produkt został dodany'})
            setTimeout(() => this.setState({message: ''}), 5000)
        }else(
            this.setState({message: 'Wypełnij wszystkie pola.'}),
            setTimeout(() => this.setState({message: ''}), 5000)
        )

    }
    fetchImgURL = (event) => {
        this.setState({imgURL: event.target.value})            
        this.imgUrlValidate(event.target.value);
    }

    fetchProductTitle = (event) => {
        this.setState({ productTitle: event.target.value.slice(0,50)})
    }

    fetchProductPrice = (event) => {
        this.setState({ productPrice: event.target.value})
    }

    imgUrlValidate = (imgURL) => {
        let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        
        if(regex.test(imgURL) === false){
            this.setState({borderBottomImgUrl: 'red', imgURLisCorrect: false})
        }else{
            this.setState({borderBottomImgUrl: 'green', imgURLisCorrect: true})
        }
        if(imgURL === ''){
            this.setState({borderBottomImgUrl: 'gray'})
        }
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
        console.log( this.state.productPrice)
        return (
            <div className={classes.AddProduct}>
                <h1>Dodaj swój produkt:</h1>
                <div className={classes.productTitle}>
                    <label htmlFor="productTitle">Wprowadź tytuł:</label>
                    <input 
                        value={this.state.productTitle}
                        type="text" 
                        onChange={(event) => this.fetchProductTitle(event)}/>
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
                        <input 
                        type="number" 
                        placeholder="Podaj cenę..."
                        onChange={(event) => this.fetchProductPrice(event)}
                        />
                    </div>
                    <div className={classes.productImg}>
                        <span>Podaj url zdjęcia:</span>
                        <input 
                        onChange={(event) => this.fetchImgURL(event)} 
                        type="text" 
                        placeholder="Podaj url zdjęcia..."
                        style={{borderBottom: `3px solid ${this.state.borderBottomImgUrl}`}}
                        />
                    </div>
                </div>
                <div className={classes.AddProductToDataBaseBox}>
                    <div className={classes.AddProductButton}>
                        <button onClick={this.AddProductToDataBase}>Dodaj produkt</button>
                    </div>
                    <div className={classes.Message}>
                        <h2>{this.state.message}</h2>
                    </div>
                </div>
                {/* <img src={this.state.imgURL} alt=""/> */}
            </div>
        )
    }
}


export default AddProduct;
