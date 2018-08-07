import { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    ADD_PRODUCT_TO_SHOPCART
} 
from './types';
import axios from 'axios';

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

export const setProductsLoading = () => {
    return{
        type: PRODUCTS_LOADING
    }
}

export const addProductToShopCart = (productFromShopCart) => {
    return{
        type: ADD_PRODUCT_TO_SHOPCART,
        payload: productFromShopCart
    }
}


// export const deleteItem = (id) => {
//     return {
//         type: DELETE_ITEM,

//     }

// }
