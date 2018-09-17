import React, { PureComponent } from 'react'
import classes from './ProductDisplay.css'
import uuid from 'uuid'
import Messager from '../../Messager/Messager';
import Aux from '../../../HOC/aux_x';
import { withRouter } from 'react-router-dom';
import CommentsContainer from '../CommentsContainer/CommentsContainer';
import ProductMapLocalization from '../ProductMapLocalization/ProductMapLocalization';

import { connect } from 'react-redux';
import { shopcart_product_counter } from '../../../Redux/actions/Actions'

class ProductDisplay extends PureComponent { 
  state = {
    ShowDetailsProduct: false,
    StatusBarWidth: 0,
    productAdded: false,
    ProductAllDetails: false,
    showMessager: false,
    maxWidthImage: 50,
    rotateImg: 0,
    showComments: true,
    showMap: false
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

    const URI= this.props.productName.replace(/\s/g,'-');
    this.props.history.push(`/${URI}`)
  }
  componentDidMount(){
    let purchasingArray = JSON.parse(localStorage.getItem('Order'));
    //Redux products counter
    this.props.shopcart_product_counter(purchasingArray.length);
  };

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
    
    //Redux products counter
    this.props.shopcart_product_counter(purchasingArray.length);
    
    for(let i =0; i<101; i++){
      this.setState({StatusBarWidth: i})
    }
    
    this.setState({productAdded: true})
    setTimeout(() => this.setState({productAdded: false}), 2500)
    setTimeout(() => this.setState({StatusBarWidth: 0}), 2500)
  }


  ShowMessager = () => {
    //Blocking send message to yourself
    if(this.props.userExist === this.props.userIdFromFirebase || this.props.userExist === null) return;
    this.setState({showMessager: !this.state.showMessager})
  }

  CloseProductInformation = () => {
    this.setState({ProductAllDetails: false, showMap: false})
    document.body.style.overflow = "visible";
    this.props.history.push('/')
  }
  
  backToProductDetails = () => {
    this.setState({showComments: true})
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
      userLogginID,
      productDescription,
      productCoordinates,
      requirements
    } = this.props;

    let requirementsDisplay = null;

    if(requirements.length !== 0){
       requirementsDisplay = requirements.map( (requirement, i) => {
         return <li key={i}>{requirement}</li>
       })
    }

    return (
      <Aux>
        <div style={{width: this.state.StatusBarWidth + '%'}} className={classes.StatusBar}></div>
        <div style={{height: productDisplayHeigth, width: productDisplayWidth+'%', flexDirection: flexDirection}} onMouseLeave={this.CloseDetailsProduct} className={classes.ProductDisplay}>
          
          <div className={classes.ImageContainer}>
            <img onClick={this.ShowDetailsProduct} style={{maxHeight: '100px'}} src={productImgUrl} alt={productName} />
          </div>

            {/* Offer information popUp */}

            {condition === "Oferta pracy" ? null :
              <Aux>
                {this.state.ShowDetailsProduct ?
                    <div className={classes.ShowDetailsProduct}>
                      <h3>{productName}</h3>
                      <img style={{maxWidth: '150px', height: 'auto'}} src={productImgUrl} alt={productName}/>
                      <span className={classes.Price}>{productPrice.toFixed(2)} PLN</span>
                      <button onClick={this.addProductToShopCart}>Dodaj do koszyka</button>
                    </div>
                : null }
              </Aux>
            }

            {/* //-------- */}

            <div className={classes.ProductDetails}>
              <h3>{productName}</h3>
              <span className={classes.Price}>{productPrice.toFixed(2)} PLN</span>
              {condition === "Oferta pracy" ? 
                <Aux>
                  <h5 style={{backgroundColor: 'orange'}}>{condition}</h5>
                  <button style={{display: 'block'}} onClick={this.ProductAllDetails}>Czytaj ogłoszenie</button>
                </Aux>
                :
                <Aux>
                  <h5>Stan: {condition}</h5>
                  <button onClick={this.addProductToShopCart}>
                    Dodaj produkt do koszyka
                    <i style={{fontSize: '15px'}} className="fas fa-cart-plus"></i>
                  </button>
                  <div className={classes.ProductDisplayShopIcon}>
                    <i onClick={this.addProductToShopCart} style={{fontSize: '25px', cursor: 'pointer'}} className="fas fa-cart-plus"></i>
                  </div>
                  <button style={{display: 'block'}} onClick={this.ProductAllDetails}>Zobacz aukcje</button>
                </Aux>
              }
            </div>
            
            {/* All information about offer  */}
            {this.state.ProductAllDetails ? 
              <div className={classes.ProductAllDetails}>

                {this.state.showMap ? 
                  <ProductMapLocalization
                    lat={productCoordinates.lat}
                    lng={productCoordinates.lng}
                    coordinates={productCoordinates}
                  />
                :
                <div className={classes.ProductImgContainer}>
                  <img 
                    src={productImgUrl} 
                    alt={productName}
                    style={{maxWidth: this.state.maxWidthImage + '%', transform: `rotate(${this.state.rotateImg}deg)`}}
                    />
                  
                  {condition === "Oferta pracy" ? 
                  <div className={classes.requirementsBox}>
                    <h3>Wymagania</h3>
                    {requirementsDisplay}
                  </div> 
                    :
                  <div className={classes.ImageOptions}>
                    <button onClick={()=>this.setState({maxWidthImage: this.state.maxWidthImage + 2})}>+</button>
                    <button onClick={()=>this.setState({maxWidthImage: this.state.maxWidthImage - 2})}>-</button>
                    <i onClick={()=>this.setState({rotateImg: this.state.rotateImg -90})} style={{fontSize: '20px', cursor: 'pointer'}} className="fas fa-undo"></i>
                  </div>
                  }
                </div>
                }
              
                {this.state.showComments ? 
                  <div className={classes.ProductInformationContainer}>
                    <div style={{width: this.state.StatusBarWidth + '%'}} className={classes.StatusBar_2}></div>
                    <header>{productName}</header>
                    <p>{productDescription}</p>
                    {condition === "Oferta pracy" ? null : <span>Dostępny kolor: <div className={classes.AvailableColor} style={{backgroundColor: productColor}}></div></span>}
                    <div className={classes.PriceContainer}>
                    {condition === "Oferta pracy" ? null : <button onClick={this.addProductToShopCart}>{this.state.productAdded ? "Dodano do koszyka" : "Dodaj do koszyka"}</button>}
                    {condition === "Oferta pracy" ? <span>Wynagrodzenie {productPrice} PLN</span> :  <span>Cena: {productPrice} PLN</span>}
                    </div>
                    <div className={classes.SocialMediaContainer}>
                      <div>
                        <span>Udostępnij</span>
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                      </div>
                      {this.state.showMap ? 
                        <i onClick={() => this.setState({showMap: false})} className="far fa-times-circle"></i>
                        :
                        <i onClick={() => this.setState({showMap: true})} className="fas fa-map-marker-alt"></i>
                      }
                      <button onClick={() => this.setState({showComments: false})}>Zobacz opinie</button>
                    </div>
                      <button className={classes.CloseBtn} onClick={this.CloseProductInformation}>Zamknij</button>
                  </div>
                  :
                  <CommentsContainer
                    backToProductDetails={this.backToProductDetails}
                    allUserCommentsUserID={userIdFromFirebase}
                  />
                  }
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


export default connect(null, { shopcart_product_counter })(withRouter(ProductDisplay));

