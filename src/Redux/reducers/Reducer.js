import  { FETCH_PRODUCTS_FROM_SERVER, PRODUCTS_LOADING} from '../actions/types';

const initialState = { 
    allProducts: [],
    loading: false
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
        default: 
            return state;
    }
}