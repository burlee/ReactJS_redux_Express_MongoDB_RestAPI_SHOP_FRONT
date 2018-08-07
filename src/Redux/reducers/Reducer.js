import  { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    ADD_PRODUCT_TO_SHOPCART
} 
from '../actions/types';

const initialState = { 
    allProducts: [],
    orderValue: JSON.parse(localStorage.getItem('Order')),
    loading: false
}

// console.log(initialState.orderValue)
export default function(state = initialState, action){
    switch(action.type){
        case FETCH_PRODUCTS_FROM_SERVER:
            return {
                ...state,
                allProducts: action.payload,
                loading: false
            }
        case PRODUCTS_LOADING:
            return{
                ...state,
                loading: true
            }
        default: 
            return state;
    }
}