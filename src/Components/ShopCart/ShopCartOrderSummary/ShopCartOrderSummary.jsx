import React, { Component } from 'react'
import classes from './ShopCartOrderSummary.css'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ShopCartOrderSummary extends Component {
  state = {
    order: JSON.parse(localStorage.getItem('Order')),
    priceSummary: 0,
    userExist: true
  }

  componentDidMount(){
    document.body.style.overflow = 'hidden';

    const order = [...this.state.order];
    let priceSummary = 0;
    
    order.forEach( product => {
      priceSummary += product.productPrice
    });

    if(this.props.userExist.userExist === null){
      this.setState({ userExist: false})
    }
    this.setState({ priceSummary })

  }

  goToCreateAccount = () => {
    this.props.history.push('/create-account');
  }

  overflowShow = () => {
    document.body.style.overflow = 'visible';
  }

  clearOrder = () =>{
    localStorage.getItem('Order', localStorage.setItem('Order', JSON.stringify([])))
    this.setState({ order: [], priceSummary: 0})
  }

  deleteProduct = (id, price) => {
    const oldPrice = this.state.priceSummary;
    const newPrice = oldPrice - price;

    let filteredOrder = this.state.order.filter( product =>{
        return product.orderID !== id;
    });

    localStorage.setItem('Order', JSON.stringify(filteredOrder) );
    this.setState({ order: filteredOrder, priceSummary: newPrice});
  }

  render() {
    const transitionOption = {
      transitionName: "fade",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 400
    }

    let showOrderProduct = null;

    if(this.state.order.length === 0){
      showOrderProduct = <h1 style={{textAlign: 'center',fontWeight: 100, marginTop: '150px'}}>Twój koszyk jest pusty <i className="fas fa-shopping-cart"></i></h1>
    }else{
      showOrderProduct = this.state.order.map( product => {
            return (
            <div key={product.orderID} className={classes.productDisplay}>
              <span style={{width: '200px', fontSize: '14px'}}>{product.productName}</span>
              <span>{product.productPrice.toFixed(2)} PLN</span>
              <img src={product.productImgUrl} alt={product.productName}/>
              <button onClick={() => this.deleteProduct(product.orderID, product.productPrice)}>X</button>
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
        <ReactCSSTransitionGroup style={{ overflowX: 'auto', width: '100%'}} {...transitionOption}>
          {showOrderProduct}
        </ReactCSSTransitionGroup>
        {this.state.userExist ? null : <a onClick={this.goToCreateAccount} style={{cursor: 'pointer',fontSize: '25px', marginTop: '10px', padding: '10px'}}>Załóż swoje konto</a>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userExist: state.auctionList
});


export default connect(mapStateToProps)(ShopCartOrderSummary)