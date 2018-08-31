import React, { PureComponent } from 'react'
import classes from './ProductDisplay.css'
import uuid from 'uuid'
import Messager from '../../Messager/Messager';
import Aux from '../../../HOC/aux_x';
import SuccessModal from '../../../UI/SuccessModal/SuccessModal';

class ProductDisplay extends PureComponent {
  state = {
    ShowDetailsProduct: false,
    StatusBarWidth: 0,
    productAdded: false,
    ProductAllDetails: false,
    showMessager: false
  }

  ShowDetailsProduct = () => {
      this.setState({ShowDetailsProduct: !this.state.ShowDetailsProduct})
  }

  CloseDetailsProduct = () => {
    setTimeout(()=> {
      this.setState({ShowDetailsProduct: false})
    },250)
  }

  ProductAllDetails = () => {
    this.setState({ProductAllDetails: true})
  }
  addProductToShopCart = () => {
    let purchasingArray = JSON.parse(localStorage.getItem('Order'));
    
    if(this.props.userExist === this.props.userIdFromFirebase){
      return;
    }
    purchasingArray.push({
      orderID: uuid(),
      id: this.props.id,
      productName: this.props.productName,
      productPrice: this.props.productPrice,
      productImgUrl: this.props.productImgUrl,
      userIdFromFirebase: this.props.userIdFromFirebase
    })
      
    localStorage.setItem( 'Order' , JSON.stringify(purchasingArray));

    
    for(let i =0; i<101; i++){
      this.setState({StatusBarWidth: i})
    }
    
    this.setState({productAdded: true})
    setTimeout(() => this.setState({productAdded: false}), 1500)
    setTimeout(() => this.setState({StatusBarWidth: 0}), 1500)
  }


  ShowMessager = () => {
    this.setState({showMessager: !this.state.showMessager})
  }
  render() {
    const props = this.props;

    return (
      <Aux>
        <div style={{width: this.state.StatusBarWidth + '%'}} className={classes.StatusBar}></div>
        {this.state.productAdded ? <SuccessModal/> : null }
        <div style={{height: this.props.productDisplayHeigth + 'px', width: this.props.productDisplayWidth+'%', flexDirection: this.props.flexDirection}} onMouseLeave={this.CloseDetailsProduct} className={classes.ProductDisplay}>
          <img onClick={this.ShowDetailsProduct} src={props.productImgUrl} alt={props.productName}/>
          
            {this.state.ShowDetailsProduct ?
                <div className={classes.ShowDetailsProduct}>
                  <h3>{props.productName}</h3>
                  <img style={{maxWidth: '150px', height: '150px'}} src={props.productImgUrl} alt={props.productName}/>
                  <span className={classes.Price}>{props.productPrice.toFixed(2)} PLN</span>
                  <button onClick={this.addProductToShopCart}>Dodaj do koszyka</button>
                </div>
            : null }

            <div className={classes.ProductDetails}>
              <h3>{props.productName}</h3>
              <span className={classes.Price}>{props.productPrice.toFixed(2)} PLN</span>
              <h5>Stan: {props.condition}</h5>
              <button onClick={this.addProductToShopCart}>Dodaj produkt do koszyka<i style={{fontSize: '15px'}} className="fas fa-cart-plus"></i></button>
              <div className={classes.ProductDisplayShopIcon}>
                <i onClick={this.addProductToShopCart} style={{fontSize: '25px', cursor: 'pointer'}} className="fas fa-cart-plus"></i>
              </div>
              {/* <button onClick={this.ProductAllDetails}>Zobacz aukcje</button> */}
            </div>

            {/* {this.state.ProductAllDetails ? 
            <div className={classes.ProductAllDetails}>
              <p>{props.productName}</p>
            </div> : null } */}
            <button onClick={this.ShowMessager}><i style={{fontSize: '20px', color: '#4c4c4c'}} className="fas fa-envelope"></i></button>
            {this.state.showMessager ? <Messager 
              closeBackdrop={this.ShowMessager} 
              userIdFromFirebase={this.props.userIdFromFirebase}
              userLogginID={this.props.userLogginID}
              productName={this.props.productName}
            /> : null}
        </div>
      </Aux>
    )
  }
}


export default ProductDisplay;