import React, { Component } from 'react'
import SmallSpinner from '../../UI/SmallSpinner/SmallSpinner';
import classes from './AddProduct.css'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment';
import 'moment/locale/pl';
import { ChromePicker } from 'react-color';


class AddProduct extends Component {
    state = {
        spinnerIsLoading: false,
        disabledAddToDbBtn: false,
        showPreviewBtnContent: 'Zobacz podgląd aukcji',
        showPreview: false,
        productPrice: '',
        productTitle: '',
        imgURL: '',
        imgURLisCorrect: false,
        category: '',
        borderBottomImgUrl: 'gray',
        message: '',
        chosenColor: '#8B4242'
    }

    componentDidMount(){
        document.body.style.overflow = "hidden";
    }

    AddProductToDataBase = () => {
        const state = this.state;
        moment.locale('pl');
        
        if(state.productPrice !== '' && state.productTitle !== '' && state.imgURLisCorrect === true && state.category !== ''){
            

            const product = {
                productName: this.firstCharToUppercase(this.state.productTitle),
                productPrice: this.state.productPrice,
                productColor: this.state.chosenColor,
                productImgUrl: this.state.imgURL,
                condition: "Używany",
                category: this.state.category,
                auctionOwnerUserIDfb: this.props.userExist.userExist,
                time: moment().format('LL')
            }
            axios.post('http://localhost:3000/offers', product)
                .then( response => {
                    this.setState({spinnerIsLoading: true, disabledAddToDbBtn: true})
                    
                    const productToFirebase = {
                        idFromRestAPI: response.data.idFromRestAPI,
                        productName: this.firstCharToUppercase(this.state.productTitle),
                        productPrice: this.state.productPrice,
                        productColor: this.state.chosenColor,
                        productImgUrl: this.state.imgURL,
                        condition: "Używany",
                        category: this.state.category,
                        time: moment().format('LL')
                    }
                    if(response.status === 201){
                        axios.post(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts.json`, productToFirebase)
                            .then(() => this.setState({spinnerIsLoading: false, disabledAddToDbBtn: false}))
                            .then( response => {
                                this.setState({message: 'Twoj produkt został dodany'})
                                setTimeout(() => this.setState({message: ''}), 2500)
                            })
                            .catch( error => alert(`Error connect with Firebase ${error}`))
                    }
                })
                .catch( error => alert(`Error connect with RESTapi ${error}`))

            // axios.post(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts.json`, product)
            //     .then( response => response )
            //     .catch( error => console.log( error ))
            // axios.post(`http://localhost:3000/offers/userAuctionsList/${this.props.userExist.userExist}`, product);
        }else(
            this.setState({message: 'Wypełnij wszystkie pola.'}),
            setTimeout(() => this.setState({message: ''}), 5000)
        )

    }
    imgUrlHandler = (event) => {
        this.closePreview();
        this.setState({imgURL: event.target.value})            
        this.imgUrlValidate(event.target.value);
    }

    productTitleHandler = (event) => {
        this.closePreview();
        this.setState({ productTitle: this.firstCharToUppercase(event.target.value.slice(0,30))})
    }

    productPriceHandler = (event) => {
        this.closePreview();
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
        this.closePreview();
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
                break;
            }
            default:
                return;
        }
    }

    showPreview = () => {
        if(this.state.productTitle === '' || this.state.productPrice === '' || this.state.category === '' || this.state.imgURLisCorrect === false){
            this.setState({showPreviewBtnContent: 'Uzupełnij wszystkie pola', showPreview: false})
            setTimeout(() => this.setState({showPreviewBtnContent: 'Zobacz podgląd aukcji'}), 2000)
        }else{
            this.setState({
                showPreviewBtnContent: 'Zobacz podgląd aukcji',
                showPreview: !this.state.showPreview
            })
        }
    }

    firstCharToUppercase(string){
        return string.slice(0,1).toUpperCase() + string.slice(1,30);
    }

    closePreview  = () => {
        this.setState({showPreview: false})
    }

    colorHandler = (color) => {
        this.setState({ chosenColor: color.hex });
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
                        onChange={(event) => this.productTitleHandler(event)}/>
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

                <div className={classes.productColorsTable}>
                    <h3>Wybierz kolor:</h3>
                    <ChromePicker color={this.state.chosenColor} onChangeComplete={this.colorHandler}/>
                </div>

                <div className={classes.productPriceAndImg}>
                    <div className={classes.productPrice}>
                        <span>Podaj cenę:</span>
                        <input 
                        type="number" 
                        placeholder="Podaj cenę..."
                        onChange={(event) => this.productPriceHandler(event)}
                        />
                    </div>
                    <div className={classes.productImg}>
                        <span>Podaj url zdjęcia:</span>
                        <input 
                        onChange={(event) => this.imgUrlHandler(event)} 
                        type="text" 
                        placeholder="Podaj url zdjęcia..."
                        style={{borderBottom: `3px solid ${this.state.borderBottomImgUrl}`}}
                        />
                    </div>
                </div>
                <div className={classes.AddProductToDataBaseBox}>
                    <div className={classes.AddProductButton}>
                        <button disabled={this.state.disabledAddToDbBtn} onClick={this.AddProductToDataBase}>Dodaj produkt</button>
                    </div>
                    <div className={classes.Message}>
                        {this.state.spinnerIsLoading ?  <SmallSpinner/> : null}
                        <h2>{this.state.message}</h2>
                    </div>
                </div>
                <button className={classes.productPrevBtn} onClick={this.showPreview}>{this.state.showPreviewBtnContent}</button>
                {this.state.showPreview ? 
                <div className={classes.PreviewProduct}>
                    <h1>Tytuł aukcji: {this.state.productTitle}</h1>
                    <h1>Kategoria aukcji: {this.state.category}</h1>
                    <h1>Cena: {this.state.productPrice}PLN</h1>
                    <img style={{maxWidth: '150px'}} src={this.state.imgURL} alt={this.state.productTitle}/>
                    <h1>Wybrany color:</h1>
                    <div style={{backgroundColor: this.state.chosenColor}}></div>
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
