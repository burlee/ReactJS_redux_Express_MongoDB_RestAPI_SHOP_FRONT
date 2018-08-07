import React, { PureComponent } from 'react'
import classes from './ProductDisplay.css'
import uuid from 'uuid'

class ProductDisplay extends PureComponent {
  state = {
    ShowDetailsProduct: false
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
    console.log( this.props.id )
    
    let purchasingArray = JSON.parse(localStorage.getItem('Order'));
    
    console.log(purchasingArray)
    purchasingArray.push({
      orderID: uuid(),
      id: this.props.id
    })
      
    localStorage.setItem( 'Order' , JSON.stringify(purchasingArray));
    
  }

  render() {
    const props = this.props;
    
    return (
      <div style={{height: this.props.productDisplayHeigth + 'px', width: this.props.productDisplayWidth+'%', flexDirection: this.props.flexDirection}} onMouseLeave={this.CloseDetails} className={classes.ProductDisplay}>
        <img onClick={this.ShowDetails} src={props.productImgUrl} alt={props.productName}/>

          {this.state.ShowDetailsProduct ?
            <div  className={classes.ShowDetailsProduct}>
              <h3>{props.productName}</h3>
              <img style={{width: '150px', height: '150px'}} src={props.productImgUrl} alt={props.productName}/>
              <span className={classes.Price}>{props.productPrice} PLN</span>
              <button onClick={this.addProductToShopCart}>Dodaj produkt do koszyka</button>
            </div>
          : null }

          <div className={classes.ProductDetails}>
            <h3>{props.productName}</h3>
            <span className={classes.Price}>{props.productPrice} PLN</span>
            <button onClick={this.addProductToShopCart}>Dodaj produkt do koszyka</button>
          </div>
      </div>
    )
  }
}


export default ProductDisplay;