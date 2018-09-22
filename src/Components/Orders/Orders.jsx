import React, { Component } from 'react'
import classes from './Orders.css'
import axios from 'axios'
import {connect} from 'react-redux'
import Aux from '../../HOC/aux_x'
import BackButton from '../../UI/BackButton/BackButton'
import QRCode from 'qrcode.react'
import {DebounceInput} from 'react-debounce-input';
import CommentModule from './CommentModule/CommentModule';

class Orders extends Component {
    state = {
        showResult: false,
        usersOrders: [],
        ownOrders: [],
        orderStatus: [],
        showUsersOrders: false,
        showOwnOrders: false,
        showSearch: false,
        searchTerm: '',
        showPaymentOptions: false,
        BANKaddress: '',
        BTCaddress: '',
        LTCaddress: '',
        showBtcQR: false,
        showLtcQR: false,
        showStatusInformationBox: false,
        sendBoxStatus: false,
        disableSendStatusBtn: false,
        statusModal: false,
        showSendStatusBtn: false,
        orderOwnerID: '',
        orderID: '',
        BTCcourse: 0,
        LTCcourse: 0,
        orderPrice: 0,
        auctionOwnerId: '',
        showCommentModule: false
    }

    componentDidMount(){
        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/orderDetails.json`)
            .then( response => {
                const usersOrdersUpdate = [];
                console.log(response.data)
                for(let key in response.data){
                    usersOrdersUpdate.push({
                        id: response.data[key].id ,
                        orderID: response.data[key].orderID ,
                        orderOwnerID: response.data[key].orderOwnerID ,
                        productImgUrl: response.data[key].productImgUrl ,
                        productName: response.data[key].productName,
                        productPrice: response.data[key].productPrice ,
                        userIdFromFirebase: response.data[key].userIdFromFirebase,
                        email: response.data[key].email,
                        userNameAndSurname: response.data[key].userNameAndSurname,
                        orderTime: response.data[key].orderTime
                    })
                }
                this.setState({usersOrders: usersOrdersUpdate})
            })
            .then( () => this.setState({showResult: true}))
            .catch( error => console.log(error))

        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/ownOrders.json`)
            .then( response => {
                const ownOrdersUpdate = [];

                for(let key in response.data){
                    ownOrdersUpdate.push({
                        id: response.data[key].id ,
                        orderID: response.data[key].orderID ,
                        orderOwnerID: response.data[key].orderOwnerID ,
                        productImgUrl: response.data[key].productImgUrl ,
                        productName: response.data[key].productName,
                        productPrice: response.data[key].productPrice ,
                        userIdFromFirebase: response.data[key].userIdFromFirebase,
                        email: response.data[key].email,
                        userNameAndSurname: response.data[key].userNameAndSurname,
                        orderTime: response.data[key].orderTime
                    })
                }
                this.setState({ownOrders: ownOrdersUpdate})
            })
            .catch( error => console.log(error))

        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC&tsyms=PLN`)
            .then( response => {
                this.setState({
                    BTCcourse: response.data.BTC.PLN,
                    LTCcourse: response.data.LTC.PLN
                })
            })
    }

    showUsersOrdersToggle = () => {
        this.setState({showUsersOrders: !this.state.showUsersOrders})
    }

    showOwnOrdersToggle = () => {
        this.setState({showOwnOrders: !this.state.showOwnOrders})
    }
    
    searchOrderToggle = () => {
        this.setState({showSearch: !this.state.showSearch, searchTerm: ''})
    }

    closeCommentModule = () => {
        this.setState({showCommentModule: false})
    }

    showPaymentMethod = (userIdFromFirebase, orderPrice) => {
        this.setState({showSearch: false, searchTerm: '', orderPrice})
        
        axios.get(`https://shop-237ef.firebaseio.com/${userIdFromFirebase}/PaymentOptions.json`)
            .then( response => {
                if(response.data === null){
                    this.setState({
                        LTCaddress: 'Metoda płatności niedostępna.',
                        BTCaddress: 'Metoda płatności niedostępna.',
                        BANKaddress: 'Metoda płatności niedostępna.'
                    })
                    return;
                };

                this.setState({
                    BANKaddress: response.data.BANKaddress,
                    BTCaddress: response.data.BTCaddress,
                    LTCaddress: response.data.LTCaddress
                })
            })
            .then(()=> {
                if(this.state.LTCaddress === undefined){
                    this.setState({LTCaddress: 'Metoda płatności niedostępna.'})
                }
                if(this.state.BTCaddress === undefined){
                    this.setState({BTCaddress: 'Metoda płatności niedostępna.'})
                }
                if(this.state.BANKaddress === undefined){
                    this.setState({BANKaddress: 'Metoda płatności niedostępna.'})
                }
            })
            .then(() => this.setState({showPaymentOptions: true}))

    }

    checkValidityStatus = (orderOwnerID, orderID) => {
        this.setState({orderOwnerID, orderID, statusModal: true, showSendStatusBtn: false})

        axios.get(`https://shop-237ef.firebaseio.com/${orderOwnerID}/orderStatus.json`)
            .then( response => {
                if(response.data === null) return;
                Object.values(response.data).forEach( orderStatus =>{
                    if(orderStatus.auctionStatusID === orderID){
                        this.setState({disableSendStatusBtn: true})
                    }
                })
            })
            .then(() => this.setState({showSendStatusBtn: true}))
    }

    changeSendStatus = () => {
        const orderStatus = {
            auctionStatusID: this.state.orderID
        }
        axios.post(`https://shop-237ef.firebaseio.com/${this.state.orderOwnerID}/orderStatus.json`, orderStatus)
            .then(() => {
                this.setState({sendBoxStatus: true})
                setTimeout(() => this.setState({sendBoxStatus: false}) ,4000)
            })
    }

    checkSendStatus = () => {
        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/orderStatus.json`)
            .then( response => {
                if(response.data === null) return;
                
                const ownOrders = [...this.state.ownOrders];
                const statusOrderUpdate = [];

                Object.values(response.data).forEach( auction => {
                    ownOrders.forEach( order => {
                        if(order.orderID === auction.auctionStatusID){
                            statusOrderUpdate.push({
                                status: 'Wysłano',
                                productName: order.productName
                            })
                        }
                    })
                })
                this.setState({orderStatus: statusOrderUpdate})
            })
            .then(()=> this.setState({showStatusInformationBox: true}))
    }

    render() {
        let usersOrders = null;
        let ownOrders = null;
        let statusInformationItem = <span>Żaden status przesyłki nie uległ zmianie.</span>;

        if(this.state.ownOrders !== null){
            ownOrders = this.state.ownOrders
            .filter(order => {
                return order.productName.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
            })
            .map( ({orderTime, productName, productImgUrl,productPrice, userIdFromFirebase}, i) => {
                return (<div key={i} className={classes.UserOrder}>
                    <h4>Data zamówienia: {orderTime}</h4>
                    <span>{productName}</span>
                    <img src={productImgUrl} alt={productName}></img>
                    <span>{productPrice}PLN</span>
                    <span style={{cursor: 'pointer'}} onClick={() => this.showPaymentMethod(userIdFromFirebase, productPrice)}>Sprawdź dostępne metody płatności</span>
                    <button onClick={()=> this.setState({auctionOwnerId: userIdFromFirebase, showCommentModule: !this.state.showCommentModule})}>Wystaw komentarz</button>
                </div>)
            })
        }

        if(this.state.usersOrders !== null){
            usersOrders = this.state.usersOrders
            .filter(order => {
                return order.productName.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
            })
            .map( ({productName, email, productImgUrl ,productPrice, orderID, orderOwnerID, orderTime , userNameAndSurname}, i)=> {
                return (<div key={i} className={classes.UserOrder}>
                    <h4>Data zamówienia: {orderTime}</h4>
                    <span>{productName}</span>
                    <img src={productImgUrl}></img>
                    <span>{productPrice}PLN</span>
                    <span>Masz zamówienie od {userNameAndSurname}</span>
                    <span>O adresie email {email}</span>
                    <span>Wyślij powiadomienie o wysłaniu przesyłki</span>
                    <button onClick={()=> this.checkValidityStatus(orderOwnerID, orderID)}>Wyślij powiadomienie</button>
                </div>
                )
            })
        }

        if(this.state.orderStatus.length !== 0){
            statusInformationItem = this.state.orderStatus.map( (order,i) => {
                return (<div key={i}>
                    <span>{order.productName}</span>
                    <span>{order.status}</span>
                </div>)
            })
        }

        return (
            <div className={classes.Orders}>
                
                {this.state.showResult ? 
                <Aux>
                    {this.state.showUsersOrders === true || this.state.showOwnOrders === true ? null :
                    <Aux>
                        <header>Przeglądaj zamówienia</header>
                        <section onClick={this.showOwnOrdersToggle}>Twoje zamówienia</section>
                        <section onClick={this.showUsersOrdersToggle}>Masz {this.state.usersOrders.length} zamówień od innych użytkowników</section> 
                        <BackButton/>
                    </Aux>
                    }
                </Aux>
                : null }
                
                {this.state.showOwnOrders ?  (
                    <div className={classes.UserOrderBox}>
                        {ownOrders}
                        {this.state.showSearch ? null : <button className={classes.BackBtn} onClick={this.showOwnOrdersToggle}>Wróć</button>}
                        <i className="fas fa-search" onClick={this.searchOrderToggle}></i>
                        <button className={classes.CheckStatusBtn} onClick={this.checkSendStatus}>Zobacz status przesyłek</button>

                            {this.state.showPaymentOptions ?
                            <Aux>
                                <div className={classes.Backdrop} onClick={()=>this.setState({showPaymentOptions: false})}></div>
                                <div className={classes.PaymentOptions}>
                                    <h4>Metody płatności</h4>
                                    <h5>Numer konta bankowego:
                                        <span>{this.state.BANKaddress}</span>
                                    </h5>
                                    <h5>Numer adresu Bitcoin:
                                        <span>{this.state.BTCaddress}</span>
                                        {this.state.BTCaddress === 'Metoda płatności niedostępna.' ? null :
                                            <Aux>
                                                <button onClick={() => this.setState({showBtcQR: !this.state.showBtcQR})}>Kod QR</button>
                                                {this.state.showBtcQR ? <QRCode size={64} value={this.state.BTCaddress} /> : null }
                                            </Aux>
                                        }
                                    </h5>
                                    <h5>Numer adresu Litecoin:
                                        <span>{this.state.LTCaddress}</span>
                                        {this.state.LTCaddress === 'Metoda płatności niedostępna.' ? null :
                                        <Aux>
                                            <button onClick={() => this.setState({showLtcQR: !this.state.showLtcQR})}>Kod QR</button>
                                            {this.state.showLtcQR ? <QRCode size={64} value={this.state.LTCaddress} /> : null}
                                        </Aux>
                                        }
                                    </h5>
                                    <div className={classes.PaymentTable}>
                                        <span>Opłata w PLN: {this.state.orderPrice}</span>
                                        <span>Opłata w BTC: {(this.state.orderPrice / this.state.BTCcourse).toFixed(4)}</span>
                                        <span>Opłata w LTC: {(this.state.orderPrice / this.state.LTCcourse).toFixed(4)}</span>
                                    </div>
                                </div>
                            </Aux>
                            : null}

                    </div> ) : null }

                {this.state.showUsersOrders ? (
                    <div className={classes.UserOrderBox}>
                        {this.state.statusModal ? 
                        <div className={classes.SendStatusModal} onClick={() => this.setState({statusModal: false, disableSendStatusBtn: false})}>
                            <button disabled={this.state.disableSendStatusBtn} className={classes.changeSendStatusBtn} onClick={this.changeSendStatus}>
                            {this.state.showSendStatusBtn ? 
                                <Aux>
                                    {this.state.disableSendStatusBtn === true ? "Już wysłałeś powiadomienie" : "Potwierdź wysłanie przesyłki"}
                                </Aux>
                            :null }
                            </button>
                        </div> : null}
                        {usersOrders}
                        {this.state.showSearch ? null : <button className={classes.BackBtn} onClick={this.showUsersOrdersToggle}>Wróć</button>}
                        <i className="fas fa-search" onClick={this.searchOrderToggle}></i>
                        
                        {this.state.sendBoxStatus ? 
                        <div className={classes.sendBoxStatus}><h1>Użytkownik został poinformowany o wysłaniu towaru.</h1></div>
                        : null}
                    </div> )
                : null}

                {this.state.showSearch ? 
                <div className={classes.Search}>
                <i onClick={this.searchOrderToggle} className="fas fa-times"></i>
                    <DebounceInput
                        placeholder="Wyszukaj zamówienia po tytule..."
                        minLength={2}
                        debounceTimeout={300}
                        onChange={event => this.setState({searchTerm: event.target.value})} />
                </div> : null }
                
                {this.state.showStatusInformationBox ? 
                <Aux>
                    <div className={classes.Backdrop} onClick={()=>this.setState({showStatusInformationBox: false})}></div>
                    <div className={classes.showStatusInformationBox}>
                        <div>
                            <span style={{border: 'none', backgroundColor: 'none'}}>Przedmiot</span>
                            <span style={{border: 'none', backgroundColor: 'none'}}>Status przesyłki</span>
                        </div>
                        {statusInformationItem}
                    </div> 
                </Aux>
                : null}

                {this.state.showCommentModule ? 
                    <Aux>
                        <div className={classes.Backdrop} onClick={() => this.setState({showCommentModule: !this.state.showCommentModule})}></div>
                        <CommentModule
                            auctionOwnerId={this.state.auctionOwnerId}
                            closeCommentModule={this.closeCommentModule}
                            /> 
                    </Aux>
                : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});

export default connect(mapStateToProps)(Orders);
