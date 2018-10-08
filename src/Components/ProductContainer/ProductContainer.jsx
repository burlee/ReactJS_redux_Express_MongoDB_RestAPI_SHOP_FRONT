import React, { Component } from 'react';
import classes from './ProductContainer.css';
import ProductDisplay from './ProductDisplay/ProductDisplay';
import PropTypes from 'prop-types'
import Spinner from '../../UI/Spinner/Spinner';
//REDUX
import { connect } from 'react-redux';
import { fetch_all_products, user_exist } from '../../Redux/actions/Actions'
import RectangleIcons from '../../UI/RectangleIcon/RectangleIcons';
import SquereIcon from '../../UI/SquereIcon/SquereIcon';


class ProductContainer extends Component {
  state = {
    shopCartIsEmpty: localStorage.getItem('Order'),
    productDisplayHeigth: 'auto',
    productDisplayWidth: 100,
    flexDirection: 'row',
    startProductPagination: 0,
    endProductPagination: 16,
    disabledBackBtn: true,
    rectangleIcon: false
  }

  componentDidMount(){
    this.props.fetch_all_products(this.state.startProductPagination, this.state.endProductPagination);
    this.props.user_exist();
    
    if(this.state.shopCartIsEmpty === null ){
      localStorage.setItem('Order', JSON.stringify([]));
    }
  }

  changeSizeToggle = () => {
    if(this.state.productDisplayWidth === 45){
      this.setState({
        rectangleIcon: false,
        productDisplayWidth: 100,
        flexDirection: 'row',
        productDisplayHeigth: 'auto'
      })
    }
    if(this.state.productDisplayWidth === 100){
      this.setState({
        rectangleIcon: true,
        productDisplayWidth: 45,
        flexDirection: 'column',
        productDisplayHeigth: 'auto'
      })
    }
  }

  nextPage = () => {
    if(this.state.startProductPagination !== 16 && this.state.endProductPagination !== 32){
      this.setState({disabledBackBtn: false})
    }

    const oldValStartPagination = this.state.startProductPagination;
    const oldValEndPagination = this.state.endProductPagination;

    this.setState({
      startProductPagination: oldValStartPagination + 16,
      endProductPagination: oldValEndPagination + 16
    })
    
    this.props.fetch_all_products(this.state.startProductPagination + 16, this.state.endProductPagination + 16);
  }

  nextPageBelowBtn = () => {
    if(this.state.startProductPagination !== 16 && this.state.endProductPagination !== 32){
      this.setState({disabledBackBtn: false})
    }

    const oldValStartPagination = this.state.startProductPagination;
    const oldValEndPagination = this.state.endProductPagination;

    this.setState({
      startProductPagination: oldValStartPagination +16,
      endProductPagination: oldValEndPagination +16
    })
    
    this.props.fetch_all_products(this.state.startProductPagination + 16, this.state.endProductPagination + 16);
  
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  backToFirstPage = () => {
    this.setState({
      startProductPagination: 0,
      endProductPagination: 16,
      disabledBackBtn: true
    })
    this.props.fetch_all_products(0, 16);
  }

  backToPreviousPage = () => {
    if(this.state.startProductPagination === 16 && this.state.endProductPagination === 32){
      this.setState({disabledBackBtn: true})
    }

    const oldValStartPagination = this.state.startProductPagination;
    const oldValEndPagination = this.state.endProductPagination;

    this.setState({
      startProductPagination: oldValStartPagination - 16,
      endProductPagination: oldValEndPagination - 16
    })
    
    this.props.fetch_all_products(this.state.startProductPagination -  16, this.state.endProductPagination -  16);
  
  }
  
  render() {
    const allProductsFromDB = this.props.allProducts.allProducts;
    let displayAllProduct = null;
    
    displayAllProduct = allProductsFromDB.map( product => {
      return <ProductDisplay
                key={product.id}
                id={product.id}
                productCoordinates={product.coordinates}
                productName={product.productName}
                productColor={product.productColor}
                productPrice={product.productPrice}
                requirements={product.requirements}
                availablePayments={product.availablePayments}
                productImgUrl={product.productImgUrl}
                productDescription={product.productDescription}
                condition={product.condition}
                userIdFromFirebase={product.auctionOwnerUserIDfb}
                userLogginID={this.props.userExist.userExist}
                userExist={this.props.userExist.userExist}
                productDisplayWidth={this.state.productDisplayWidth}
                flexDirection={this.state.flexDirection}
                productDisplayHeigth={this.state.productDisplayHeigth}
            />
    })


    return (
      <div className={classes.ProductContainer}>
        <div className={classes.DisplaySettings}>
          <button onClick={this.changeSizeToggle}>
          {this.state.rectangleIcon ? <RectangleIcons/> : <SquereIcon/>}
          </button>
          <button onClick={this.backToFirstPage}>Pierwsza strona</button>
          <button disabled={this.state.disabledBackBtn} onClick={this.backToPreviousPage}>Wróć</button>  
          
          {this.props.allProducts.allProducts.length === 0 ? 
          <button onClick={this.backToFirstPage}>Pierwsza strona</button> :
          <button onClick={this.nextPage}>Następna strona</button>
          }

        </div>
        {this.props.loading.loading ? <Spinner/> : null}
        <div className={classes.ProductContainerFlexBox}>
          {displayAllProduct}
          {this.props.allProducts.allProducts.length === 0 ? <h1 style={{color: '#4c4c4c'}}>Produkt nie został znaleziony.</h1> : null}
        </div>
        {this.props.allProducts.allProducts.length === 0 ? null : <button className={classes.nextPageBtnUnderContainer} onClick={this.nextPageBelowBtn}>Następna strona</button>}
      </div>
    )
  }
}

ProductContainer.propTypes = {
  fetch_all_products: PropTypes.func.isRequired,
  allProducts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  allProducts: state.auctionList,
  loading: state.auctionList,
  userExist: state.auctionList
});

export default connect(mapStateToProps, {fetch_all_products, user_exist} )(ProductContainer);