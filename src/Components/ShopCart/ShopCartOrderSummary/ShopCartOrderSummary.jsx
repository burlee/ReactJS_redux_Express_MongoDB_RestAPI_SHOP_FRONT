import axios from 'axios';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Aux from '../../../HOC/aux_x';
import classes from './ShopCartOrderSummary.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SuccessOrderModal from '../../../UI/SuccessOrderModal/SuccessOrderModal';


class ShopCartOrderSummary extends Component {
  state = {
    order: JSON.parse(localStorage.getItem('Order')),
    priceSummary: 0,
    userExist: true,
    isOrderModal: false,
    orderIsSuccess: false
  }


  componentDidMount(){
    document.body.style.overflow = 'hidden';

    const order = [...this.state.order];
    let priceSummary = 0;
    
    order.forEach( product => {
      priceSummary += product.productPrice
    });

    if(this.props.userExist.userExist === null){this.setState({ userExist: false})};

    this.setState({ priceSummary });
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

  confirmOrder = () => {
      
    this.state.order.forEach( order => {
      const orderDetails = {
        orderOwnerID: this.props.userExist.userExist,
        id: order.id,
        orderID: order.orderID,
        productImgUrl: order.productImgUrl,
        productName: order.productName,
        productPrice: order.productPrice,
        userIdFromFirebase: order.userIdFromFirebase
      }
      axios.post(`https://shop-237ef.firebaseio.com/${order.userIdFromFirebase}/orderDetails.json`, orderDetails)
        .then( response => {
          if(response.status === 200){this.setState({isOrderModal: false})};
        })
        .then(()=>{
          this.setState({orderIsSuccess: true})
          setTimeout(()=> this.setState({orderIsSuccess: false}), 3500)
        })
    })

    
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

  orderModalToggle = () => {
    this.setState({isOrderModal: !this.state.isOrderModal})
  }


  render() {
    const transitionOption = {
      transitionName: "fade",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 400
    }

    let showOrderProduct = null;
    let showOrderProductDetails = null;

    if(this.state.order.length === 0){
      showOrderProduct = <h1 style={{fontSize: '25px',fontWeight: '400', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center'}}>Twój koszyk jest pusty <i className="fas fa-shopping-cart"></i></h1>
    }else{
      showOrderProduct = this.state.order.map( product => {
            return (
            <div key={product.orderID} className={classes.productDisplay}>
              <span>{product.productName}</span>
              <span style={{width: '100px'}}>{product.productPrice.toFixed(2)} PLN</span>
              <img src={product.productImgUrl} alt={product.productName}/>
              <button onClick={() => this.deleteProduct(product.orderID, product.productPrice)}>X</button>
            </div>
          )
      })
    }
    showOrderProductDetails = this.state.order.map( (product) => {
      return (
        <div key={product.orderID} className={classes.productDisplay}>
          <span>{product.productName}</span>
          <img src={product.productImgUrl} alt={product.productName}/>
          <span style={{width: '100px'}}>{product.productPrice.toFixed(2)} PLN</span>
        </div>
      )
    })

    return (
      <div className={classes.ShopCartOrderSummary}>
        <div className={classes.ShopCartOptions}>
          <NavLink onClick={this.overflowShow} to="/">Zamknij</NavLink>
          <span>Suma zamówienia: {this.state.priceSummary.toFixed(2)} PLN</span>
          <span>Ilość produktów: {this.state.order.length}</span>
          <button onClick={this.clearOrder}>Wyczyść koszyk</button>
          {this.state.order.length === 0 || this.props.userExist.userExit === null || this.props.userExist.userPaymentSettings === null || this.props.userExist.userPersonalDetails === null  ?
             <i title="Twoj koszyk jest pusty lub nie uzupełniłeś swojego profilu." style={{fontSize: '25px', cursor: 'pointer'}} className="fas fa-info-circle"></i> : 
             <button style={{backgroundColor: 'rgba(128, 128, 128, 0.2)'}} onClick={this.orderModalToggle}>Złoż zamówienie</button>
          }
        </div>

        {this.state.isOrderModal ? 
          <Aux>
            <div className={classes.Backdrop} onClick={this.orderModalToggle}>
              <button onClick={this.confirmOrder}>Potwierdzam</button>
            </div>
              <div className={classes.orderModal}>
                <h4>Potwierdź swoje zamówienie</h4>
                {showOrderProductDetails}
                <button onClick={this.confirmOrder}>Potwierdzam</button>
              </div> 
          </Aux>
        : null}
        {this.state.orderIsSuccess ? <SuccessOrderModal/> : null }
        <ReactCSSTransitionGroup style={{ overflowX: 'auto', width: '100%'}} {...transitionOption}>
          {showOrderProduct}
        </ReactCSSTransitionGroup>
        {this.state.userExist ? null : 
          <a onClick={this.goToCreateAccount} 
            style={{
              cursor: 'pointer',
              fontSize: '22px', 
              position: 'absolute' ,
              bottom: '0px', 
              padding: '15px', 
              textAlign:'center', 
              background: '#fafafa',
              width: '100%'}}>Załóż swoje konto, aby składać zamówienia.</a>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userExist: state.auctionList
});


export default connect(mapStateToProps)(ShopCartOrderSummary)