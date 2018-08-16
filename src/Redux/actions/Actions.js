import { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    USER_EXIST,
    SEARCH_PRODUCT_IN_DB,
    SEARCH_BY_PRICE,
    SEARCH_BY_PRICE_MORE,
    FETCH_LAST_15_PRODUCTS_FROM_DB
} 
from './types';
import axios from 'axios';
import FirebaseConfig from '../../FirebaseConfig';



export const fetch_all_products = (startPagination , endPagination) => dispatch => {
    dispatch(set_products_loading());
    
    axios.get('http://localhost:3000/offers')
        .then( response => {
            dispatch({
                type: FETCH_PRODUCTS_FROM_SERVER,
                payload: response.data.products.slice(startPagination, endPagination)
            })
        })
}

export const fetch_last_15_products_from_db = () => dispatch => {
    dispatch(set_products_loading());
    axios.get('http://localhost:3000/offers')
        .then( response => {
            const arrayLengthEnd = response.data.count;
            const arrayLengthStart = arrayLengthEnd - 15;
            dispatch({
                type: FETCH_LAST_15_PRODUCTS_FROM_DB,
                payload: response.data.products.slice(arrayLengthStart , arrayLengthEnd)
            })
        })
}

export const search_by_price = (priceValue) => dispatch => {
    dispatch(set_products_loading());
    axios.get(`http://localhost:3000/offers/`)
        .then( response => {
            const filteredByPrice = [];
            response.data.products.map( product =>{
                if(product.productPrice < priceValue){
                    filteredByPrice.push({
                        id: product.id,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        productImgUrl: product.productImgUrl
                    })
                }
            })
            dispatch({
                type: SEARCH_BY_PRICE,
                payload: filteredByPrice
            })
        })
}

//Fetch product from RestAPI where price is greather than PRICEVALUE
export const search_by_price_more = (priceValue) => dispatch => {
    dispatch(set_products_loading());
    axios.get(`http://localhost:3000/offers/`)
        .then( response => {
            const filteredByPrice = [];
            response.data.products.map( product =>{
                if(product.productPrice > priceValue){
                    filteredByPrice.push({
                        id: product.id,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        productImgUrl: product.productImgUrl
                    })
                }
            })
            dispatch({
                type: SEARCH_BY_PRICE_MORE,
                payload: filteredByPrice
            })
        })
}

export const search_product_in_db = (searchTerm) => dispatch => {
    console.log( searchTerm.length )
    if(searchTerm.length < 4){
        return;
    };
    dispatch(set_products_loading());
    axios.get(`http://localhost:3000/offers/${searchTerm}`)
        .then( response => {
            dispatch({
                type: SEARCH_PRODUCT_IN_DB,
                payload: response.data.products
            })
        })
}

export const set_products_loading = () => {
    return{
        type: PRODUCTS_LOADING
    }
}


export const user_exist = () => dispatch => {
    FirebaseConfig.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch({
            type: USER_EXIST,
            payload: user.uid
          });
        } else {
          dispatch({
            type: USER_EXIST,
            payload: null
          });
        }
      });
}

