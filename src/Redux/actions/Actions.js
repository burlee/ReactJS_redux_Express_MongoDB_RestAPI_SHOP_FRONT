import { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    USER_EXIST,
    SEARCH_PRODUCT_IN_DB,
    SEARCH_BY_PRICE
} 
from './types';
import axios from 'axios';
import FirebaseConfig from '../../FirebaseConfig';



export const fetch_all_products = () => dispatch => {
    dispatch(setProductsLoading());
    axios.get('http://localhost:3000/offers')
        .then( response => {
            dispatch({
                type: FETCH_PRODUCTS_FROM_SERVER,
                payload: response.data.products
            })
        })
}

export const search_by_price = (priceValue) => dispatch => {
    dispatch(setProductsLoading());
    console.log(priceValue)
    axios.get(`http://localhost:3000/offers/`)
        .then( response => {
            console.log( response.data.products )
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
            console.log(filteredByPrice)
            dispatch({
                type: SEARCH_BY_PRICE,
                payload: filteredByPrice
            })
        })
}

export const search_product_in_db = (searchTerm) => dispatch => {
    dispatch(setProductsLoading());
    axios.get(`http://localhost:3000/offers/${searchTerm}`)
        .then( response => {
            dispatch({
                type: SEARCH_PRODUCT_IN_DB,
                payload: response.data.products
            })
        })
}

export const setProductsLoading = () => {
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

