import { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    USER_EXIST
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
    // return{
    //     type: USER_EXIST,
    //     payload: FirebaseConfig.auth().currentUser
    // }
}

// FirebaseConfig.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in.
//       console.log( user.uid )
//     } else {
//       // No user is signed in.
//     }
//   })
// export const addProductToShopCart = (productFromShopCart) => {
//     return{
//         type: ADD_PRODUCT_TO_SHOPCART,
//         payload: productFromShopCart
//     }
// }


// export const deleteItem = (id) => {
//     return {
//         type: DELETE_ITEM,

//     }

// }
