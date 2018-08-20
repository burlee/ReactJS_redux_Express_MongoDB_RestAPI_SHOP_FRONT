import React, { Component } from 'react'
import classes from './AddProduct.css'
import axios from 'axios'
import { connect } from 'react-redux'
import uuid from 'uuid'

class AddProduct extends Component {
    state = {
        showPreviewBtnContent: 'Podgląd',
        showPreview: false,
        productPrice: '',
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
        
        if(state.productPrice !== '' && state.productTitle !== '' && state.imgURLisCorrect === true && state.category !== ''){
            this.setState({message: 'Twoj produkt został dodany'})
            setTimeout(() => this.setState({message: ''}), 5000)
            const product = {
                productName: this.state.productTitle,
                productPrice: this.state.productPrice,
                productImgUrl: this.state.imgURL,
                uniqueID: uuid(),
                condition: "Nowy"
            }
            console.log( this.state.productPrice )
            axios.post('http://localhost:3000/offers', product)
                .then( response => console.log( response ))
                .catch( error => console.log( error ))

            axios.post(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts.json`, product)
            // axios.post(`http://localhost:3000/offers/userAuctionsList/${this.props.userExist.userExist}`, product);
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
        this.setState({ productTitle: this.firstCharToUppercase(event.target.value.slice(0,30))})
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

    showPreview = () => {
        if(this.state.productTitle === '' || this.state.productPrice === '' || this.state.category === '' || this.state.imgURLisCorrect === false){
            this.setState({showPreviewBtnContent: 'Uzupełnij wszystkie pola'})
            setTimeout(() => this.setState({showPreviewBtnContent: 'Podgląd'}), 2000)
        }else{
            this.setState({
                showPreviewBtnContent: 'Podgląd',
                showPreview: !this.state.showPreview
            })
        }
    }

    firstCharToUppercase(string){
        return string.slice(0,1).toUpperCase() + string.slice(1,30);
    }
    render() {
        return (
            <div className={classes.AddProduct}>
                <h1>Dodaj swój produkt:</h1>
                <div className={classes.productTitle}>
                    <label htmlFor="productTitle">Wprowadź tytuł:</label>
                    <input 
                        value={this.state.productTitle}
                        type="text" 
                        onChange={(event) => this.fetchProductTitle(event)}/>
                    <span>Ilość znakow : {this.state.productTitle.length}/30</span>
                </div>
                
                <div className={classes.productCategory}>
                    <h1>Wybierz kategorię: </h1> 
                    <div className={classes.CategoryBox}>
                        <button onClick={() => this.selectedCategory("Odzież")} style={{boxShadow: `0px 0px 15px ${this.state.OdzieżBoxShadowStyle}`}}>Odzież</button>
                        <button onClick={() => this.selectedCategory("Elektronika")}>Elektronika</button>
                        <button onClick={() => this.selectedCategory("Samochody")}>Samochody</button>
                        <button onClick={() => this.selectedCategory("Wyposażenie domu")}>Wyposażenie domu</button>
                        <button onClick={() => this.selectedCategory("Inne")}>Inne</button>
                    </div>
                    <span>Wybrana kategoria: {this.state.category}</span>
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
                <button className={classes.productPrevBtn} onClick={this.showPreview}>{this.state.showPreviewBtnContent}</button>
                {this.state.showPreview ? 
                <div className={classes.PreviewProduct}>
                    <h1>Tytuł aukcji: {this.state.productTitle}</h1>
                    <h1>Kategoria aukcji: {this.state.category}</h1>
                    <h1>Cena: {this.state.productPrice}PLN</h1>
                    <img style={{maxWidth: '150px'}} src={this.state.imgURL}/>
                </div>
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});

export default connect(mapStateToProps)(AddProduct);
