import React, { Component } from 'react'
import classes from './UserAuctionsList.css'
import axios from 'axios'
import SmallSpinner from '../../UI/SmallSpinner/SmallSpinner';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Aux from '../../HOC/aux_x';
import { DebounceInput } from 'react-debounce-input'
import { connect } from 'react-redux'

class UserAuctionsList extends Component {
    state = {
        UserAuctionsList: [],
        borderBottomPriceColor: 'rgba(76, 76, 76, 0.25)',
        disabledChangeDataBtn: true,
        showEditProductModal: false,
        auctionNotFound: false,
        spinnerIsLoading: true,
        spinnerIsLoadingDelete: false,
        confirmDeleteModal: false,
        idFromFirebase: '',
        idFromRestAPI: '',
        productNameEditData: '',
        productPriceEditData: '',
        productConditionEditData: ''
    }

    _isMounted = false;
    
    componentDidMount() {
        this._isMounted = true;

        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts.json`)
            .then( response => {
                const updateUserAuctionList = [];
                for(let key in response.data){
                    updateUserAuctionList.push({
                        id: key,
                        idFromRESTapi: response.data[key].idFromRestAPI,
                        condition: response.data[key].condition,
                        productImgUrl: response.data[key].productImgUrl,
                        productName: response.data[key].productName,
                        productPrice: response.data[key].productPrice,
                        uniqueID: response.data[key].uniqueID,
                        time: response.data[key].time
                    })
                }
                if(this._isMounted){
                    this.setState({UserAuctionsList: updateUserAuctionList})
                }
            })
            .then(() => {
                if(this.state.UserAuctionsList.length === 0){
                    this.setState({auctionNotFound: true})
                }
                this.setState({spinnerIsLoading: false})
            })
            .catch( error => console.log(error))

        
    }
    deleteUserAuction = () =>{
        this.setState({spinnerIsLoadingDelete: true})

        axios.delete(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts/${this.state.idFromFirebase}.json`)
            .then(()=> this.setState({spinnerIsLoadingDelete: false, confirmDeleteModal: false}))
        axios.delete(`http://localhost:3000/offers/${this.state.idFromRestApi}`)

        let updateAuctionList = this.state.UserAuctionsList.filter( auction => {
            return auction.idFromRESTapi !== this.state.idFromRestApi
        })

        this.setState({ UserAuctionsList: updateAuctionList})
    }

    productNameHandler = (event) => {
        this.validationInputData(event.target.value);
        this.setState({productNameEditData: event.target.value})
    }
    saveEditDataToDB = () => {
        
        if(this.state.productNameEditData !== '' && this.state.productPriceEditData !== '' && this.state.productConditionEditData !== ''){
            this.setState({spinnerIsLoading: true})
            
            const updateProductData = {
                productName: this.state.productNameEditData.slice(0,30),
                productPrice: this.state.productPriceEditData,
                condition: this.state.productConditionEditData
            }
            axios.patch(`http://localhost:3000/offers/${this.state.idFromRestAPI}`, updateProductData)
                .then( response => this.setState({spinnerIsLoading: false}))
    
            axios.patch(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts/${this.state.idFromFirebase}.json`, updateProductData)
        }

        if(this.state.productPriceEditData === ''){
            this.setState({borderBottomPriceColor: 'red'})
            setTimeout(()=> this.setState({borderBottomPriceColor: 'rgba(76, 76, 76, 0.25)'}), 2500)
        }
    }

    editProductData = (idFromFirebase, idFromRestAPI, productName, productPrice, productCondition) => {
        
        this.setState({
            showEditProductModal: true,
            idFromFirebase: idFromFirebase,
            idFromRestAPI: idFromRestAPI,
            productNameEditData: productName,
            productPriceEditData: productPrice,
            productConditionEditData: productCondition
        })
    }

    editProductToggle = () => {
        this.setState({
            disabledChangeDataBtn: true,
            showEditProductModal: !this.state.showEditProductModal
        })
    }
    closeDeleteAuctionModal = () => {
        this.setState({confirmDeleteModal: false})
    }
    validationInputData = (productNameEditData) => {
        if(productNameEditData.length > 4 ){
            this.setState({disabledChangeDataBtn: false})
        }else( this.setState({disabledChangeDataBtn: true}))
    }
    confirmDeleteModalFn = (idFromFirebase, idFromRestApi) => {
        this.setState({
            confirmDeleteModal: true,
            idFromFirebase: idFromFirebase,
            idFromRestApi: idFromRestApi
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        console.log( this.state)
        const transitionOption = {
            transitionName: "fade",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 1000
        }

        let displayUserAuctionsList = null;

        if(this.state.UserAuctionsList.length !== 0){
            displayUserAuctionsList = this.state.UserAuctionsList.map( displayUserAuction => {
                return (
                    <div key={displayUserAuction.id} className={classes.DisplayUserAuction}>
                        <h3>{displayUserAuction.productName}</h3>
                        <div className={classes.AuctionBox}>
                            <div className={classes.AuctionDetails}>
                                <label>Cena: {displayUserAuction.productPrice}PLN</label>
                                <label>Stan: {displayUserAuction.condition}</label>
                                <label>Czas dodania: {displayUserAuction.time}</label>
                                <button onClick={() => this.confirmDeleteModalFn(displayUserAuction.id, displayUserAuction.idFromRESTapi)}>Zakończ aukcję</button>
                                <button
                                    style={{backgroundColor: 'transparent',color: '#4c4c4c'}}
                                    onClick={()=> this.editProductData(displayUserAuction.id, displayUserAuction.idFromRESTapi, displayUserAuction.productName, displayUserAuction.productPrice, displayUserAuction.condition)}
                                    >Edytuj
                                </button>
                            </div>
                            <div className={classes.ImgContainer}>
                                <img src={displayUserAuction.productImgUrl} alt={displayUserAuction.productName}/>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className={classes.UserAuctionsList}>

                {this.state.confirmDeleteModal ? 
                    <Aux>
                        <div onClick={this.closeDeleteAuctionModal} className={classes.Backdrop}></div>
                        <div className={classes.DeleteAuctionModal}>
                            <h1>Czy jesteś pewny?</h1>
                            <button onClick={this.deleteUserAuction}>Tak</button>
                        </div> 
                    </Aux>
                : null}
                
                {this.state.spinnerIsLoadingDelete ? <SmallSpinner/> : null}
                <h1>Lista twoich aukcji:</h1>
                <ReactCSSTransitionGroup 
                    style={{ overflowX: 'auto', width: '100%'}} 
                    {...transitionOption}>
                    {displayUserAuctionsList}
                </ReactCSSTransitionGroup>
                {this.state.auctionNotFound === true ? <h3>Niestety nie posiadasz żadnych aukcji.</h3> : null}
                {this.state.spinnerIsLoading === true ? <SmallSpinner/> : null}
                
                {this.state.showEditProductModal ?
                <Aux>
                    <div onClick={this.editProductToggle} className={classes.Backdrop}></div> 
                    <div className={classes.EditProductModal}>
                        <h1>Edytuj szczegóły aukcji:</h1>
                        <label htmlFor="auctionName">Edytuj nazwę aukcji:</label>
                        <DebounceInput
                            id="auctionName"
                            minLength={5}
                            debounceTimeout={300}
                            onChange={ event => this.productNameHandler(event)} />

                        <label htmlFor="auctionPrice">Edytuj cenę:</label>
                        <DebounceInput
                            style={{borderBottom: `1px solid ${this.state.borderBottomPriceColor}`}}
                            id="auctionPrice"
                            minLength={1}
                            debounceTimeout={300}
                            onChange={ event => this.setState({productPriceEditData: event.target.value})} />

                        <label htmlFor="auctionCondition">Edytuj stan produktu:</label>
                        <DebounceInput
                            id="auctionCondition"
                            minLength={4}
                            debounceTimeout={300}
                            onChange={ event => this.setState({productConditionEditData: event.target.value})} />

                        <button disabled={this.state.disabledChangeDataBtn} onClick={this.saveEditDataToDB}>Zapisz zmiany</button>
                    </div>
                </Aux>
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});


export default connect(mapStateToProps)(UserAuctionsList);