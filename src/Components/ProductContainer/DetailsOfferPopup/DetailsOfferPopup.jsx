import React from 'react';
import classes from './DetailsOfferPopup.css'
import Aux from '../../../HOC/aux_x';

const DetailsProductPopup = ({productName, productImgUrl, productPrice, addProductToShopCart, showDetailsProduct}) => {
    return (
        <Aux>
            {showDetailsProduct ? 
                <div className={classes.ShowDetailsProduct}>
                    <h3>{productName}</h3>
                    <img style={{ maxWidth: '150px', height: 'auto' }} src={productImgUrl} alt={productName} />
                    <span>{productPrice.toFixed(2)} PLN</span>
                    <button onClick={addProductToShopCart}>Dodaj do koszyka</button>
                </div> 
            : null }
        </Aux>
    )
}

export default DetailsProductPopup;
