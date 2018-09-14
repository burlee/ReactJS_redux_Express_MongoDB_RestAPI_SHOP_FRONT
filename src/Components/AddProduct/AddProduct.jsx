import React, { Component } from 'react'
import SmallSpinner from '../../UI/SmallSpinner/SmallSpinner';
import classes from './AddProduct.css'
import axios from 'axios'
import moment from 'moment';
import Aux from '../../HOC/aux_x'
import 'moment/locale/pl';
import { DebounceInput } from 'react-debounce-input';
import { ChromePicker } from 'react-color';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../AddProduct/MapMarker'
import { connect } from 'react-redux';

class AddProduct extends Component {
    state = {
        spinnerIsLoading: false,
        disabledAddToDbBtn: false,
        showPreviewBtnContent: 'Zobacz podgląd aukcji',
        showPreview: false,
        productPrice: '',
        productTitle: '',
        productDescription: '',
        condition: 'Nowy',
        imgURL: '',
        imgURLisCorrect: false,
        category: 'Brak',
        borderBottomImgUrl: '#4c4c4c',
        message: '',
        chosenColor: '#8B4242',
        center: {
            lat: 52.2297,
            lng: 21.0122
        },
        zoom: 11
    }

    componentDidMount(){
        document.body.style.overflow = "hidden";
    }

    AddProductToDataBase = () => {
        const state = this.state;
        moment.locale('pl');
        
        if(state.productPrice !== '' && state.productTitle !== '' && state.imgURLisCorrect === true && state.category !== 'Brak' && state.productDescription !== ''){
            

            const product = {
                productName: this.firstCharToUppercase(this.state.productTitle),
                productPrice: this.state.productPrice,
                productColor: this.state.chosenColor,
                productImgUrl: this.state.imgURL,
                productDescription: this.state.productDescription,
                condition: this.state.condition,
                coordinates: this.state.center,
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
                        productDescription: this.state.productDescription,
                        condition: this.state.condition,
                        coordinates: this.state.center,
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
            this.setState({borderBottomImgUrl: '#f44336', imgURLisCorrect: false})
        }else{
            this.setState({borderBottomImgUrl: '#4caf50', imgURLisCorrect: true})
        }
        if(imgURL === ''){
            this.setState({borderBottomImgUrl: '#4c4c4c'})
        }
    }

    selectedCategory = (category) => {
        this.closePreview();
        switch(category){
            case "Elektronika": {
                if(this.state.category === 'Elektronika'){
                    this.setState({
                        category: 'Brak'})
                }else{
                    this.setState({
                        category: 'Elektronika',
                        condition: 'Nowy'
                    })
                }
                break;
            }
            case "Odzież": {
                if(this.state.category === 'Odzież'){
                    this.setState({
                        category: 'Brak'})
                }else{
                    this.setState({
                        category: 'Odzież',
                        condition: 'Nowy'
                    })
                }
                break;
            }
            case "Samochody":{
                if(this.state.category === 'Samochody'){
                    this.setState({
                        category: 'Brak'})
                }else{
                    this.setState({
                        category: 'Samochody',
                        condition: 'Nowy'
                    })
                }
                break;
            }
            case "Wyposażenie domu":{
                if(this.state.category === 'Wyposażenie domu'){
                    this.setState({
                        category: 'Brak'})
                }else{
                    this.setState({
                        category: 'Wyposażenie domu',
                        condition: 'Nowy'
                    })
                }
                break;
            }
            case "Oferta pracy":{
                if(this.state.category === 'Oferta pracy'){
                    this.setState({
                        category: 'Brak',
                        condition: 'Nowy'})
                }else{
                    this.setState({
                        category: 'Oferta pracy',
                        condition: 'Oferta pracy'
                    })
                }
                break;
            }
            case "Inne": {
                if(this.state.category === 'Inne'){
                    this.setState({
                        category: 'Brak'})
                }else{
                    this.setState({
                        category: 'Inne',
                        condition: 'Nowy'
                    })
                }
                break;
            }
            default:
                return;
        }
    }

    showPreview = () => {
        if(this.state.productTitle === '' || this.state.productPrice === '' || this.state.category === 'Brak' || this.state.imgURLisCorrect === false){
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

    coordinatesHandler = (event) => {
        const center = {
          lat: parseFloat(event.lat),
          lng: parseFloat(event.lng)
        };

        this.setState({center: center})
    }

    render() {
        return (
            <div className={classes.AddProduct}>
                <h1>Dodaj swój produkt</h1>
                <div className={classes.productTitle}>
                    <label htmlFor="productTitle">Wprowadź tytuł:</label>
                    <input 
                        id="productTitle"
                        value={this.state.productTitle}
                        type="text" 
                        onChange={(event) => this.productTitleHandler(event)}/>
                    <span>Ilość znakow : {this.state.productTitle.length}/30</span>
                </div>
                
                <div className={classes.productDescription}>
                    <h1>Opisz swoje ogłoszenie</h1>
                    <DebounceInput
                        element="textarea"
                        minLength={15}
                        debounceTimeout={300}
                        onChange={event => this.setState({productDescription: event.target.value})} />
                </div>

                <div className={classes.mapContainer}>
                    <h1>Ustal swoją lokalizacje</h1>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDoXg87F7Bl_o-xG0ZY5D3ov9jL1meXQQg' }}
                        center={this.state.center}
                        defaultZoom={this.state.zoom}
                        onClick={event => this.coordinatesHandler(event)}
                    >

                    <MapMarker 
                       lat={this.state.center.lat}
                       lng={this.state.center.lng} 
                    />

                  </GoogleMapReact>                
                </div>

                {this.state.category === "Oferta pracy" ? null :
                    <div className={classes.productCondition}>
                        <h1>Wybierz stan produktu</h1>
                        <div>
                            <button onClick={() => this.setState({condition: 'Nowy'})}>Nowy</button>
                            <button onClick={() => this.setState({condition: 'Używany'})}>Używany</button>
                        </div>
                        <span>Wybrany stan: {this.state.condition}</span>
                    </div>
                }

                <div className={classes.productCategory}>
                    <h1>Wybierz kategorię</h1> 
                    <div className={classes.CategoryBox}>
                        <button onClick={() => this.selectedCategory("Odzież")} style={{boxShadow: `0px 0px 15px ${this.state.OdzieżBoxShadowStyle}`}}>Odzież</button>
                        <button onClick={() => this.selectedCategory("Elektronika")}>Elektronika</button>
                        <button onClick={() => this.selectedCategory("Samochody")}>Samochody</button>
                        <button onClick={() => this.selectedCategory("Wyposażenie domu")}>Wyposażenie domu</button>
                        <button onClick={() => this.selectedCategory("Oferta pracy")}>Oferta pracy</button>
                        <button onClick={() => this.selectedCategory("Inne")}>Inne</button>
                    </div>
                    <span>Wybrana kategoria: {this.state.category}</span>
                </div>

                {this.state.category === "Oferta pracy" ? null :
                <div className={classes.productColorsTable}>
                    <h3>Wybierz kolor:</h3>
                    <ChromePicker color={this.state.chosenColor} onChangeComplete={this.colorHandler}/>
                </div>
                }

                <div className={classes.productPriceAndImg}>
                    <div className={classes.productPrice}>
                        {this.state.category === "Oferta pracy" ? <span>Podaj wynagrodzenie</span> : <span>Podaj cenę:</span>}
                        <input 
                        type="number" 
                        placeholder="Wpisz kwotę..."
                        onChange={(event) => this.productPriceHandler(event)}
                        />
                    </div>
                    <div className={classes.productImg}>
                        {this.state.category === "Oferta pracy" ? <span>Logo firmy(URL)</span> : <span>Podaj zdjęcie(url):</span>}
                        <input 
                        onChange={(event) => this.imgUrlHandler(event)} 
                        type="text" 
                        placeholder="Podaj url zdjęcia..."
                        style={{borderBottom: `1px solid ${this.state.borderBottomImgUrl}`}}
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
                    <h1>Stan: {this.state.condition}</h1>
                    <img style={{maxWidth: '150px'}} src={this.state.imgURL} alt={this.state.productTitle}/>
                    {this.state.category === "Oferta pracy" ? null :
                        <Aux>
                            <h1>Wybrany color:</h1>
                            <div style={{backgroundColor: this.state.chosenColor}}></div>
                        </Aux>}
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
