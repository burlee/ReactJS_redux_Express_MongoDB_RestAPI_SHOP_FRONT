import { FETCH_PRODUCTS_FROM_SERVER, PRODUCTS_LOADING } from './types';
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
// export const deleteItem = (id) => {
//     return {
//         type: DELETE_ITEM,

//     }

// }
