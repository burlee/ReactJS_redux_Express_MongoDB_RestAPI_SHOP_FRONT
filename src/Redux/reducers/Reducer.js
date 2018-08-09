import  { 
    FETCH_PRODUCTS_FROM_SERVER, 
    PRODUCTS_LOADING,
    USER_EXIST
} 
from '../actions/types';
import FirebaseConfig from '../../FirebaseConfig';

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
        default: 
            return state;
    }
}