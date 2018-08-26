import  { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    USER_EXIST,
    USER_EMAIL,
    SEARCH_PRODUCT_IN_DB,
    SEARCH_BY_PRICE,
    SEARCH_BY_PRICE_MORE,
    FETCH_LAST_15_PRODUCTS_FROM_DB
} 
from '../actions/types';

const initialState = { 
    allProducts: [],
    last15products: [],
    orderValue: JSON.parse(localStorage.getItem('Order')),
    loading: false,
    userExist: null,
    userEmail: ''
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
        case FETCH_LAST_15_PRODUCTS_FROM_DB:
            return{
                ...state,
                last15products: action.payload,
                loading: false
            }
        case USER_EMAIL:
            return{
                ...state,
                userEmail: action.payload
            }
        default: 
            return state;
    }
}