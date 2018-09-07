import React, { Component } from 'react'
import classes from './UserAuctionsList.css'
import axios from 'axios'
import SmallSpinner from '../../UI/SmallSpinner/SmallSpinner';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Aux from '../../HOC/aux_x';
import { DebounceInput } from 'react-debounce-input'
import { connect } from 'react-redux'
import BackButton from '../../UI/BackButton/BackButton'

class UserAuctionsList extends Component {
    state = {
        UserAuctionsList: [],
        borderBottomPriceColor: 'rgba(76, 76, 76, 0.1)',
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
        productConditionEditData: '',
        searchAuction: '',
        editStatus: ''
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
        
        axios.delete(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts/${this.state.idFromFirebase}.json`)
            .then(()=> this.setState({confirmDeleteModal: false}))
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
            
            const updateProductData = {
                productName: this.state.productNameEditData.slice(0,30),
                productPrice: this.state.productPriceEditData,
                condition: this.state.productConditionEditData
            }
            axios.patch(`http://localhost:3000/offers/${this.state.idFromRestAPI}`, updateProductData)
                .then( () => {
                    this.setState({editStatus: 'Zmiany zostały zapisane'});
                    setTimeout(() => this.setState({showEditProductModal: false, editStatus: ''}), 4000)  
                })
    
            axios.patch(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts/${this.state.idFromFirebase}.json`, updateProductData)
        }

        if(this.state.productPriceEditData === ''){
            this.setState({borderBottomPriceColor: '#f44336'})
            setTimeout(()=> this.setState({borderBottomPriceColor: 'rgba(76, 76, 76, 0.1)'}), 2500)
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
        const transitionOption = {
            transitionName: "fade",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 1000
        }

        let displayUserAuctionsList = null;

        if(this.state.UserAuctionsList.length !== 0){
            displayUserAuctionsList = this.state.UserAuctionsList
            .filter(auction => {
                return auction.productName.toLowerCase().indexOf(this.state.searchAuction.toLowerCase()) !== -1;
            })
            .map( displayUserAuction => {
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
                            <button onClick={this.deleteUserAuction}>Potwierdzam</button>
                        </div> 
                    </Aux>
                : null}
                
                {this.state.spinnerIsLoadingDelete ? <SmallSpinner/> : null}
                <header>
                    Lista twoich aukcji:
                    <DebounceInput
                            placeholder="Wyszukaj swojej aukcji..."
                            id="auctionName"
                            minLength={1}
                            debounceTimeout={500}
                            onChange={ event => this.setState({searchAuction: event.target.value})} 
                            />
                </header>
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
                        <h1><i class="fas fa-edit"></i>Edytuj szczegóły aukcji</h1>
                        <label htmlFor="auctionNameEdit">Nowa nazwa aukcji: <span>*</span></label>
                        <DebounceInput
                            id="auctionNameEdit"
                            minLength={5}
                            debounceTimeout={300}
                            onChange={ event => this.productNameHandler(event)} />

                        <label htmlFor="auctionPrice">Nowa cena:</label>
                        <DebounceInput
                            style={{borderBottom: `1px solid ${this.state.borderBottomPriceColor}`}}
                            id="auctionPrice"
                            minLength={1}
                            debounceTimeout={300}
                            onChange={ event => this.setState({productPriceEditData: event.target.value})} />

                        <label htmlFor="auctionCondition">Zmień stan produktu: {this.state.productConditionEditData}</label>
                        
                        <button className={classes.EditButton} onClick={()=> this.setState({productConditionEditData: 'Nowy'})}>Nowy</button>
                        <button className={classes.EditButton} onClick={()=> this.setState({productConditionEditData: 'Używany'})}>Używany</button>
                        
                        <button 
                            style={{cursor: 'pointer', backgroundColor: 'transparent', outline: 'none', border: 'none', padding: '20px', color: '#4c4c4c'}}
                            disabled={this.state.disabledChangeDataBtn} 
                            onClick={this.saveEditDataToDB}>
                            Zapisz zmiany
                        </button>
                        <h2 style={{textAlign: 'center', fontWeight: '400', paddingTop: '10px'}}>{this.state.editStatus}</h2>
                    </div>
                </Aux>
                : null}
                <BackButton/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});


export default connect(mapStateToProps)(UserAuctionsList);