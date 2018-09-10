import React, { PureComponent } from 'react'
import classes from './ProductDisplay.css'
import uuid from 'uuid'
import Messager from '../../Messager/Messager';
import Aux from '../../../HOC/aux_x';
import SuccessModal from '../../../UI/SuccessModal/SuccessModal';
import { withRouter } from 'react-router-dom'


class ProductDisplay extends PureComponent { 
  state = {
    ShowDetailsProduct: false,
    StatusBarWidth: 0,
    productAdded: false,
    ProductAllDetails: false,
    showMessager: false,
    maxWidthImage: 60,
    rotateImg: 0
  }

  ShowDetailsProduct = () => {
      this.setState({ShowDetailsProduct: !this.state.ShowDetailsProduct})
  }

  CloseDetailsProduct = () => {
    setTimeout(()=> {this.setState({ShowDetailsProduct: false})},250)
  }

  ProductAllDetails = () => {
    this.setState({ProductAllDetails: true});
    document.body.style.overflow = "hidden";
  }

  addProductToShopCart = () => {
    let purchasingArray = JSON.parse(localStorage.getItem('Order'));
    
    //User can't add own product to shop cart
    if(this.props.userExist === this.props.userIdFromFirebase) return;
  
    purchasingArray.push({
      orderID: uuid(),
      id: this.props.id,
      productName: this.props.productName,
      productPrice: this.props.productPrice,
      productImgUrl: this.props.productImgUrl,
      userIdFromFirebase: this.props.userIdFromFirebase
    });
      
    localStorage.setItem( 'Order' , JSON.stringify(purchasingArray));

    
    for(let i =0; i<101; i++){
      this.setState({StatusBarWidth: i})
    }
    
    this.setState({productAdded: true})
    setTimeout(() => this.setState({productAdded: false}), 2500)
    setTimeout(() => this.setState({StatusBarWidth: 0}), 2500)
  }


  ShowMessager = () => {
    //Blocking send message to yourself
    if(this.props.userExist === this.props.userIdFromFirebase) return;
    this.setState({showMessager: !this.state.showMessager})
  }

  CloseProductInformation = () => {
    this.setState({ProductAllDetails: false})
    document.body.style.overflow = "visible";
  }
  
  render() {

    const {
      condition,
      flexDirection,
      productColor,
      productDisplayHeigth,
      productDisplayWidth,
      productImgUrl,
      productName,
      productPrice,
      userIdFromFirebase,
      userLogginID
    } = this.props;

    return (
      <Aux>
        <div style={{width: this.state.StatusBarWidth + '%'}} className={classes.StatusBar}></div>
        {this.state.productAdded ? <SuccessModal/> : null }
        <div style={{height: productDisplayHeigth, width: productDisplayWidth+'%', flexDirection: flexDirection}} onMouseLeave={this.CloseDetailsProduct} className={classes.ProductDisplay}>
          
          <div className={classes.ImageContainer}>
            <img onClick={this.ShowDetailsProduct} src={productImgUrl} alt={productName}/>
          </div>

            {/* Product information popUp */}
            {this.state.ShowDetailsProduct ?
                <div className={classes.ShowDetailsProduct}>
                  <h3>{productName}</h3>
                  <img style={{maxWidth: '150px', height: 'auto'}} src={productImgUrl} alt={productName}/>
                  <span className={classes.Price}>{productPrice.toFixed(2)} PLN</span>
                  <button onClick={this.addProductToShopCart}>Dodaj do koszyka</button>
                </div>
            : null }
            {/* //-------- */}

            <div className={classes.ProductDetails}>
              <h3>{productName}</h3>
              <span className={classes.Price}>{productPrice.toFixed(2)} PLN</span>
              <h5>Stan: {condition}</h5>
              <button onClick={this.addProductToShopCart}>
                Dodaj produkt do koszyka
                <i style={{fontSize: '15px'}} className="fas fa-cart-plus"></i>
              </button>
              <div className={classes.ProductDisplayShopIcon}>
                <i onClick={this.addProductToShopCart} style={{fontSize: '25px', cursor: 'pointer'}} className="fas fa-cart-plus"></i>
              </div>
              <button style={{display: 'block'}} onClick={this.ProductAllDetails}>Zobacz aukcje</button>
            </div>
            
            {/* All information about product (auction all details) */}
            {this.state.ProductAllDetails ? 
              <div className={classes.ProductAllDetails}>
                
                <div className={classes.ProductImgContainer}>
                  <img 
                    src={productImgUrl} 
                    alt={productName}
                    style={{maxWidth: this.state.maxWidthImage + '%', transform: `rotate(${this.state.rotateImg}deg)`}}
                    />
                  <div className={classes.ImageOptions}>
                    <button onClick={()=>this.setState({maxWidthImage: this.state.maxWidthImage + 2})}>+</button>
                    <button onClick={()=>this.setState({maxWidthImage: this.state.maxWidthImage - 2})}>-</button>
                    <i onClick={()=>this.setState({rotateImg: this.state.rotateImg -90})} style={{fontSize: '20px', cursor: 'pointer'}} className="fas fa-undo"></i>
                  </div>
                </div>

                <div className={classes.ProductInformationContainer}>
                  <div style={{width: this.state.StatusBarWidth + '%'}} className={classes.StatusBar_2}></div>
                  <header>{productName}</header>
                  <p>Rolex uses Oystersteel for its steel watch cases. Specially developed by the brand, Oystersteel belongs to the 904L steel family, superalloys most commonly used in high-technology and in the aerospace and chemical industries, where maximum resistance to corrosion is essential. Oystersteel is extremely resistant, offers an exceptional finish once polished and maintains its beauty even in the harshest environments.</p>
                  <span>Dostępny kolor: <div className={classes.AvailableColor} style={{backgroundColor: productColor}}></div></span>
                  <div className={classes.PriceContainer}>
                    <button onClick={this.addProductToShopCart}>{this.state.productAdded ? "Dodano do koszyka" : "Dodaj do koszyka"}</button>
                    <span>Cena: {productPrice} PLN</span>
                  </div>
                  <div className={classes.SocialMediaContainer}>
                    <span>Udostępnij</span>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                  </div>
                    <button className={classes.CloseBtn} onClick={this.CloseProductInformation}>Zamknij</button>
                </div>
              </div> 
            : null }
            {/* //------ */}

            <i onClick={this.ShowMessager} style={{fontSize: '20px', color: '#4c4c4c', cursor: 'pointer'}} className="fas fa-envelope"></i>
            
            {this.state.showMessager ? 
              <Messager 
                closeBackdrop={this.ShowMessager} 
                userIdFromFirebase={userIdFromFirebase}
                userLogginID={userLogginID}
                productName={productName}
              /> 
            : null}

        </div>
      </Aux>
    )
  }
} 


export default withRouter(ProductDisplay);