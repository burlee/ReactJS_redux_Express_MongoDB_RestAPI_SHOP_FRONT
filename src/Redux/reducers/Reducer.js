import  { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    USER_EXIST,
    SEARCH_PRODUCT_IN_DB,
    SEARCH_BY_PRICE,
    SEARCH_BY_PRICE_MORE
} 
from '../actions/types';

const initialState = { 
    allProducts: [],
    orderValue: JSON.parse(localStorage.getItem('Order')),
    loading: false,
    userExist: null
}


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
        case USER_EXIST:
            return{
                ...state,
                userExist: action.payload
            }
        case SEARCH_PRODUCT_IN_DB:
            return{
                ...state,
                allProducts: action.payload,
                loading: false
            }
        case SEARCH_BY_PRICE:
            return{
                ...state,
                allProducts: action.payload,
                loading: false
            }
        case SEARCH_BY_PRICE_MORE:
            return{
                ...state,
                allProducts: action.payload,
                loading: false
            }
        default: 
            return state;
    }
}