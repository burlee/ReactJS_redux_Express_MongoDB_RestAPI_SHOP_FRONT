import {
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
    USER_PERSONAL_DETAILS,
    SHOPCART_PRODUCT_COUNTER
}
    from './types';
import axios from 'axios';
import FirebaseConfig from '../../FirebaseConfig';



export const fetch_all_products = (startPagination, endPagination, XD) => dispatch => {
    dispatch(set_products_loading());

    axios.get('http://localhost:3000/offers')
        .then(response => {
            dispatch({
                type: FETCH_PRODUCTS_FROM_SERVER,
                payload: response.data.products.slice(startPagination, endPagination)
            })
        })
};

export const shopcart_product_counter = (orderLength) => dispatch => {
    dispatch({
        type: SHOPCART_PRODUCT_COUNTER,
        payload: orderLength
    });
}

export const fetch_last_15_products_from_db = () => dispatch => {
    dispatch(set_products_loading());
    axios.get('http://localhost:3000/offers')
        .then(response => {
            const arrayLengthEnd = response.data.count;
            const arrayLengthStart = arrayLengthEnd - 15;
            dispatch({
                type: FETCH_LAST_15_PRODUCTS_FROM_DB,
                payload: response.data.products.slice(arrayLengthStart, arrayLengthEnd)
            })
        })
}

export const search_by_price = (priceValue, checkedNew, checkedUsed, selectedCategory) => dispatch => {
    dispatch(set_products_loading());

    //If selectedCategory variable is not empty execute below code
    if(selectedCategory !== ''){
        axios.get(`http://localhost:3000/offers`)
            .then(response => {
                console.log( response )
                let filteredByPrice = [];
                response.data.products.forEach(product => {
                    if (product.productPrice < priceValue && product.category === selectedCategory) {
                        filteredByPrice.push({
                            id: product.id,
                            productName: product.productName,
                            productColor: product.productColor,
                            productPrice: product.productPrice,
                            productImgUrl: product.productImgUrl,
                            coordinates: product.coordinates,
                            productDescription: product.productDescription,
                            category: product.category,
                            requirements: product.requirements,
                            availablePayments: product.availablePayments,
                            condition: product.condition,
                            auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                        })
                    }
                })
                if (checkedNew === true) {
                    const filteredWithNewOption = [];
                    filteredByPrice.forEach(product => {
                        if (product.condition === "Nowy") {
                            filteredWithNewOption.push({
                                id: product.id,
                                productName: product.productName,
                                productColor: product.productColor,
                                productPrice: product.productPrice,
                                productImgUrl: product.productImgUrl,
                                coordinates: product.coordinates,
                                productDescription: product.productDescription,
                                category: product.category,
                                requirements: product.requirements,
                                availablePayments: product.availablePayments,
                                condition: product.condition,
                                auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                            })
                        }
                    })
                    filteredByPrice = filteredWithNewOption;
                }
                if (checkedUsed === true) {
                    const filteredWithNewOption = [];
                    filteredByPrice.forEach(product => {
                        if (product.condition === "Używany") {
                            filteredWithNewOption.push({
                                id: product.id,
                                productName: product.productName,
                                productColor: product.productColor,
                                productPrice: product.productPrice,
                                productImgUrl: product.productImgUrl,
                                coordinates: product.coordinates,
                                productDescription: product.productDescription,
                                category: product.category,
                                requirements: product.requirements,
                                availablePayments: product.availablePayments,
                                condition: product.condition,
                                auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                            })
                        }
                    })
                    filteredByPrice = filteredWithNewOption;
                }
                dispatch({
                    type: SEARCH_BY_PRICE,
                    payload: filteredByPrice
                })
            })
    }
    if(selectedCategory === ''){
        axios.get(`http://localhost:3000/offers`)
            .then(response => {
                let filteredByPrice = [];
                
                response.data.products.forEach(product => {
                    if (product.productPrice < priceValue) {
                        filteredByPrice.push({
                            id: product.id,
                            productName: product.productName,
                            productColor: product.productColor,
                            productPrice: product.productPrice,
                            productImgUrl: product.productImgUrl,
                            coordinates: product.coordinates,
                            productDescription: product.productDescription,
                            category: product.category,
                            requirements: product.requirements,
                            availablePayments: product.availablePayments,
                            condition: product.condition,
                            auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                        })
                    }
                })
                if (checkedNew === true) {
                    const filteredWithNewOption = [];
                    filteredByPrice.forEach(product => {
                        if (product.condition === "Nowy") {
                            filteredWithNewOption.push({
                                id: product.id,
                                productName: product.productName,
                                productColor: product.productColor,
                                productPrice: product.productPrice,
                                productImgUrl: product.productImgUrl,
                                coordinates: product.coordinates,
                                productDescription: product.productDescription,
                                category: product.category,
                                requirements: product.requirements,
                                availablePayments: product.availablePayments,
                                condition: product.condition,
                                auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                            })
                        }
                    })
                    filteredByPrice = filteredWithNewOption;
                }
                if (checkedUsed === true) {
                    const filteredWithNewOption = [];
                    filteredByPrice.forEach(product => {
                        if (product.condition === "Używany") {
                            filteredWithNewOption.push({
                                id: product.id,
                                productName: product.productName,
                                productColor: product.productColor,
                                productPrice: product.productPrice,
                                productImgUrl: product.productImgUrl,
                                coordinates: product.coordinates,
                                productDescription: product.productDescription,
                                category: product.category,
                                requirements: product.requirements,
                                availablePayments: product.availablePayments,
                                condition: product.condition,
                                auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                            })
                        }
                    })
                    filteredByPrice = filteredWithNewOption;
                }
                dispatch({
                    type: SEARCH_BY_PRICE,
                    payload: filteredByPrice
                })
            })
    }
}

//Fetch product from RestAPI where price is greather than PRICEVALUE
export const search_by_price_more = (priceValue, checkedNew, checkedUsed, selectedCategory) => dispatch => {
    dispatch(set_products_loading());

    if(selectedCategory !== ''){
        axios.get(`http://localhost:3000/offers`)
        .then(response => {
            let filteredByPrice = [];
            response.data.products.forEach(product => {
                if (product.productPrice > priceValue && product.category === selectedCategory) {
                    filteredByPrice.push({
                        id: product.id,
                        productName: product.productName,
                        productColor: product.productColor,
                        productPrice: product.productPrice,
                        productImgUrl: product.productImgUrl,
                        coordinates: product.coordinates,
                        productDescription: product.productDescription,
                        condition: product.condition,
                        requirements: product.requirements,
                        availablePayments: product.availablePayments,
                        auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                    })
                }
            })
            if (checkedNew === true) {
                const filteredWithNewOption = [];
                filteredByPrice.forEach(product => {
                    if (product.condition === "Nowy") {
                        filteredWithNewOption.push({
                            id: product.id,
                            productName: product.productName,
                            productColor: product.productColor,
                            productPrice: product.productPrice,
                            productImgUrl: product.productImgUrl,
                            coordinates: product.coordinates,
                            productDescription: product.productDescription,
                            condition: product.condition,
                            requirements: product.requirements,
                            availablePayments: product.availablePayments,
                            auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                        })
                    }
                })
                filteredByPrice = filteredWithNewOption;
            }
            if (checkedUsed === true) {
                const filteredWithNewOption = [];
                filteredByPrice.forEach(product => {
                    if (product.condition === "Używany") {
                        filteredWithNewOption.push({
                            id: product.id,
                            productName: product.productName,
                            productColor: product.productColor,
                            productPrice: product.productPrice,
                            coordinates: product.coordinates,
                            productDescription: product.productDescription,
                            productImgUrl: product.productImgUrl,
                            condition: product.condition,
                            requirements: product.requirements,
                            availablePayments: product.availablePayments,
                            auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                        })
                    }
                })
                filteredByPrice = filteredWithNewOption;
            }
            dispatch({
                type: SEARCH_BY_PRICE_MORE,
                payload: filteredByPrice
            })
        })
    }
    if(selectedCategory === ''){

        axios.get(`http://localhost:3000/offers`)
            .then(response => {
                let filteredByPrice = [];
                response.data.products.forEach(product => {
                    if (product.productPrice > priceValue) {
                        filteredByPrice.push({
                            id: product.id,
                            productName: product.productName,
                            productColor: product.productColor,
                            productPrice: product.productPrice,
                            coordinates: product.coordinates,
                            productDescription: product.productDescription,
                            productImgUrl: product.productImgUrl,
                            condition: product.condition,
                            requirements: product.requirements,
                            availablePayments: product.availablePayments,
                            auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                        })
                    }
                })
                if (checkedNew === true) {
                    const filteredWithNewOption = [];
                    filteredByPrice.forEach(product => {
                        if (product.condition === "Nowy") {
                            filteredWithNewOption.push({
                                id: product.id,
                                productName: product.productName,
                                productColor: product.productColor,
                                productPrice: product.productPrice,
                                coordinates: product.coordinates,
                                productDescription: product.productDescription,
                                productImgUrl: product.productImgUrl,
                                condition: product.condition,
                                requirements: product.requirements,
                                availablePayments: product.availablePayments,
                                auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                            })
                        }
                    })
                    filteredByPrice = filteredWithNewOption;
                }
                if (checkedUsed === true) {
                    const filteredWithNewOption = [];
                    filteredByPrice.forEach(product => {
                        if (product.condition === "Używany") {
                            filteredWithNewOption.push({
                                id: product.id,
                                productName: product.productName,
                                productColor: product.productColor,
                                productPrice: product.productPrice,
                                coordinates: product.coordinates,
                                productDescription: product.productDescription,
                                productImgUrl: product.productImgUrl,
                                condition: product.condition,
                                requirements: product.requirements,
                                availablePayments: product.availablePayments,
                                auctionOwnerUserIDfb: product.auctionOwnerUserIDfb
                            })
                        }
                    })
                    filteredByPrice = filteredWithNewOption;
                }
                dispatch({
                    type: SEARCH_BY_PRICE_MORE,
                    payload: filteredByPrice
                })
            })
    }
}

export const search_product_in_db = (searchTerm) => dispatch => {
    if (searchTerm.length < 4) {
        return;
    };
    dispatch(set_products_loading());
    axios.get(`http://localhost:3000/offers/${searchTerm}`)
        .then(response => {
            dispatch({
                type: SEARCH_PRODUCT_IN_DB,
                payload: response.data.products
            })
        })
}

export const set_products_loading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}


export const user_exist = () => dispatch => {
    FirebaseConfig.auth().onAuthStateChanged(user => {
        if (user) {
            // setTimeout(() => {
            //     FirebaseConfig.auth().signOut();
            //     window.location.reload();
            // }, 10000);
            dispatch({
                type: USER_EXIST,
                payload: user.uid
            });

            dispatch({
                type: USER_EMAIL,
                payload: user.email
            });

            //----
            dispatch(settings_user_filled(user.uid));

            //----
            dispatch(message_counter(user.uid));
            setInterval(()=> dispatch(message_counter(user.uid)) , 180000);

        } else {
            dispatch({
                type: USER_EXIST,
                payload: null
            });

            dispatch({
                type: USER_EMAIL,
                payload: null
            });
        }
    });
}

export const settings_user_filled = (userID) => dispatch => {
    axios.get(`https://shop-237ef.firebaseio.com/${userID}/PaymentOptions.json`)
        .then( response => {
            dispatch({
                type: USER_PAYMENT_SETTINGS,
                payload: response.data
            });
        })
//Fetch user name and surname
    axios.get(`https://shop-237ef.firebaseio.com/${userID}/UserDetails.json`)
    .then( response => {
        dispatch({
            type: USER_PERSONAL_DETAILS,
            payload: response.data
        });
    })

}

export const message_counter = (userID) => dispatch => {
    axios.get(`https://shop-237ef.firebaseio.com/${userID}/messages.json`)
        .then( response =>{
            const messageCounter = [];
            if(response.data === null){
                return;
            }
            let messages = Object.values(response.data);
            for(let key in messages){
               Object.keys( messages[key]).map( message => {
                   messageCounter.push(message)
               });
            };     
            dispatch({
                type: MESSAGE_COUNTER,
                payload: messageCounter.length
            })
        })
}
