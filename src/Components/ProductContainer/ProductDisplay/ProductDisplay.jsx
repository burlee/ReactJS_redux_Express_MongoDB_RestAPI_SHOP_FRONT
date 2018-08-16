import React, { PureComponent } from 'react'
import classes from './ProductDisplay.css'
import uuid from 'uuid'
import Aux from '../../../HOC/aux_x';
import SuccessModal from '../../../UI/SuccessModal/SuccessModal';

class ProductDisplay extends PureComponent {
  state = {
    ShowDetailsProduct: false,
    StatusBarWidth: 0,
    productAdded: false
  }

  ShowDetails = () => {
      this.setState({ShowDetailsProduct: !this.state.ShowDetailsProduct})
  }

  CloseDetails = () => {
    setTimeout(()=> {
      this.setState({ShowDetailsProduct: false})
    },250)
  }

  addProductToShopCart = () => {
    
    let purchasingArray = JSON.parse(localStorage.getItem('Order'));
    
    purchasingArray.push({
      orderID: uuid(),
      id: this.props.id,
      productName: this.props.productName,
      productPrice: this.props.productPrice,
      productImgUrl: this.props.productImgUrl
    })
      
    localStorage.setItem( 'Order' , JSON.stringify(purchasingArray));

    
    for(let i =0; i<101; i++){
      this.setState({StatusBarWidth: i})
    }
    
    this.setState({productAdded: true})
    setTimeout(() => this.setState({productAdded: false}), 1500)
    setTimeout(() => this.setState({StatusBarWidth: 0}), 1500)
  }

  render() {
    const props = this.props;
    
    return (
      <Aux>
        <div style={{width: this.state.StatusBarWidth + '%'}} className={classes.StatusBar}></div>
        {this.state.productAdded ? <SuccessModal/> : null }
        <div style={{height: this.props.productDisplayHeigth + 'px', width: this.props.productDisplayWidth+'%', flexDirection: this.props.flexDirection}} onMouseLeave={this.CloseDetails} className={classes.ProductDisplay}>
          <img onClick={this.ShowDetails} src={props.productImgUrl} alt={props.productName}/>

            {this.state.ShowDetailsProduct ?
              <div  className={classes.ShowDetailsProduct}>
                <h3>{props.productName}</h3>
                <img style={{maxWidth: '150px', height: '150px'}} src={props.productImgUrl} alt={props.productName}/>
                <span className={classes.Price}>{props.productPrice} PLN</span>
                <button onClick={this.addProductToShopCart}>Dodaj produkt do koszyka</button>
              </div>
            : null }

            <div  className={classes.ProductDetails}>
              <h3>{props.productName}</h3>
              <span className={classes.Price}>{props.productPrice} PLN</span>
              <button onClick={this.addProductToShopCart}>Dodaj produkt do koszyka<i style={{fontSize: '15px'}} className="fas fa-cart-plus"></i></button>
            </div>
        </div>
      </Aux>
    )
  }
}


export default ProductDisplay;