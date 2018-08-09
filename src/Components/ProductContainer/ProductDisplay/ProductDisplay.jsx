import React, { PureComponent } from 'react'
import classes from './ProductDisplay.css'
import uuid from 'uuid'

class ProductDisplay extends PureComponent {
  state = {
    ShowDetailsProduct: false,
    borderColor: '#fafafa'
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

    this.setState({borderColor: '#4caf50'})
    setTimeout(() => this.setState({borderColor: '#fafafa'}), 2000)
  }

  render() {
    const props = this.props;
    
    return (
      <div style={{borderTop: `3px solid ${this.state.borderColor}`, height: this.props.productDisplayHeigth + 'px', width: this.props.productDisplayWidth+'%', flexDirection: this.props.flexDirection}} onMouseLeave={this.CloseDetails} className={classes.ProductDisplay}>
        <img onClick={this.ShowDetails} src={props.productImgUrl} alt={props.productName}/>

          {this.state.ShowDetailsProduct ?
            <div  className={classes.ShowDetailsProduct}>
              <h3>{props.productName}</h3>
              <img style={{width: '150px', height: '150px'}} src={props.productImgUrl} alt={props.productName}/>
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
    )
  }
}


export default ProductDisplay;