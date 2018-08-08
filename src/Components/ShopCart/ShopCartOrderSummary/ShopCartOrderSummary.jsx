import React, { Component } from 'react'
import classes from './ShopCartOrderSummary.css'
import { NavLink } from 'react-router-dom'

export default class ShopCartOrderSummary extends Component {
  state = {
    order: JSON.parse(localStorage.getItem('Order')),
    priceSummary: 0
  }
  componentDidMount(){
    document.body.style.overflow = 'hidden';

    const order = [...this.state.order];
    let priceSummary = 0;
    
    order.forEach( product => {
      priceSummary += product.productPrice
    });

    this.setState({ priceSummary })

  }

  overflowShow = () => {
    document.body.style.overflow = 'visible';
  }

  clearOrder = () =>{
    localStorage.getItem('Order', localStorage.setItem('Order', JSON.stringify([])))
    this.setState({ order: [], priceSummary: 0})
  }

  render() {

    let showOrderProduct = null;

    if(this.state.order.length === 0){
      showOrderProduct = <h1 style={{textAlign: 'center',fontWeight: 100, marginTop: '150px'}}>Twój koszyk jest pusty.</h1>
    }else{
      showOrderProduct = this.state.order.map( product => {
            return (
            <div key={product.orderID} className={classes.productDisplay}>
              <span style={{width: '200px', fontSize: '14px'}}>{product.productName}</span>
              <span>{product.productPrice} PLN</span>
              <img src={product.productImgUrl} alt={product.productName}/>
            </div>
          )
      })
    }
    return (
      <div className={classes.ShopCartOrderSummary}>
        <div className={classes.ShopCartOptions}>
          <NavLink onClick={this.overflowShow} to="/">Zamknij</NavLink>
          <span>Suma zamówienia: {this.state.priceSummary.toFixed(2)} PLN</span>
          <span>Ilość produktów: {this.state.order.length}</span>
          <button onClick={this.clearOrder}>Wyczyść koszyk</button>
        </div>
        {showOrderProduct}
      </div>
    )
  }
}
