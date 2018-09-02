import  { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    USER_EXIST,
    USER_EMAIL,
    SEARCH_PRODUCT_IN_DB,
    SEARCH_BY_PRICE,
    SEARCH_BY_PRICE_MORE,
    FETCH_LAST_15_PRODUCTS_FROM_DB,
    MESSAGE_COUNTER,
    USER_PAYMENT_SETTINGS,
    USER_PERSONAL_DETAILS
} 
from '../actions/types';

const initialState = { 
    allProducts: [],
    last15products: [],
    orderValue: JSON.parse(localStorage.getItem('Order')),
    loading: false,
    userExist: null,
    userEmail: '',
    messageCount: 0,
    userPaymentSettings: null,
    userPersonalDetails: null
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
        case MESSAGE_COUNTER:
            return{
                ...state,
                messageCount: action.payload
            }
        case USER_PAYMENT_SETTINGS:
            return{
                ...state,
                userPaymentSettings: action.payload
            }
        case USER_PERSONAL_DETAILS:
            return{
                ...state,
                userPersonalDetails: action.payload
            }
        default: 
            return state;
    }
}