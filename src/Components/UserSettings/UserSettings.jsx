import React, { Component } from 'react';
import classes from './UserSettings.css';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { connect } from 'react-redux';
import { user_exist } from '../../Redux/actions/Actions'
import BackButton from '../../UI/BackButton/BackButton'


class UserSettings extends Component {
    state = {
        showPaymentDetails: false,
        showPaymentOptions: false,
        accountNumberIsCorrectly: true,
        accountBankNbBorderColor: '#4c4c4c',
        accountBankNumber: '',
        bitcoinAddressNumber: '',
        litecoinAddressNumber: '',
        litecoinAddressIsCorrectly: true,
        litecoinAddressBorderBottom: '#4c4c4c',
        bitcoinAddressIsCorrectly: true,
        bitcoinAddressBorderBottom: '#4c4c4c',
        successAddedAddress: false,
        showPaymentsModal: false,
        currentBTCAddress: '',
        currentLTCAddress: '',
        currentBANKAddres: '',
        userNameAndSurname: ''
    }

    showPaymentDetailsToggle = () => {
        this.setState({showPaymentDetails: !this.state.showPaymentDetails})
    }

    showPaymentOptionsToggle = () => {
        this.setState({showPaymentOptions: !this.state.showPaymentOptions})
    }
    
    bitcoinAddressHandler = (bitcoinAddress) => {
        if( bitcoinAddress.length < 26 || bitcoinAddress.length > 35){
            this.setState({bitcoinAddressIsCorrectly: true, bitcoinAddressBorderBottom: '#4c4c4c', bitcoinAddressNumber: ''})
        }else( this.setState({bitcoinAddressIsCorrectly: false, bitcoinAddressBorderBottom: '#4caf50', bitcoinAddressNumber: bitcoinAddress}))
    }
    
    litecoinAddressHandler = (litecoinAddress) => {
        if( litecoinAddress.length < 20 || litecoinAddress.length > 40){
            this.setState({litecoinAddressIsCorrectly: true, litecoinAddressBorderBottom: '#4c4c4c',litecoinAddressNumber: ''})
        }else( this.setState({litecoinAddressIsCorrectly: false, litecoinAddressBorderBottom: '#4caf50', litecoinAddressNumber: litecoinAddress}))
    }
    
    accountBankNumberHandler = (accountBankNumber) => {
        this.accountBankValidate(accountBankNumber);
    }

    accountBankValidate(accountBankNumber){

        const regex = /^[0-9]*$/;

        if( regex.test(accountBankNumber) === false || accountBankNumber.length < 26){
            this.setState({accountNumberIsCorrectly: true, accountBankNbBorderColor: '#f44336', accountBankNumber: ''})
        }else(
            this.setState({accountNumberIsCorrectly: false, accountBankNbBorderColor: '#4caf50', accountBankNumber})
        )
        
        if( accountBankNumber === ''){
            this.setState({accountBankNbBorderColor: '#4c4c4c'})
        }
    }

    saveUserNameAndSurname = () => {
        if(this.state.userNameAndSurname.length < 8 ) return;

        const userNameAndSurname = {
            userNameAndSurname: this.state.userNameAndSurname
        }
        axios.patch(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/UserDetails.json`, userNameAndSurname)
        .then( response => {
            if(response.status === 200){
                this.props.user_exist();
                this.refs.userNameAndSurname.state.value = '';
                this.setState({successAddedAddress: true, userNameAndSurname: ''});
                setTimeout(() => this.setState({successAddedAddress: false}), 2500)
            }
        })
    }



    saveBTCaddress = () => {
        if(this.state.bitcoinAddressNumber.length >= 26){
            const BTCaddress = {
                BTCaddress: this.state.bitcoinAddressNumber
            };

            axios.patch(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/PaymentOptions.json`, BTCaddress)
                .then( response => {
                    if(response.status === 200){
                        this.props.user_exist();
                        this.refs.btc.state.value = '';
                        this.setState({successAddedAddress: true, bitcoinAddressNumber: '', bitcoinAddressBorderBottom: '#4c4c4c'});
                        setTimeout(() => this.setState({successAddedAddress: false}), 2500)
                    }
                })
        }
    }

    saveBANKaddress = () => {
        if(this.state.accountBankNumber.length === 26){
            const BANKaddress = {
                BANKaddress: this.state.accountBankNumber
            };
            axios.patch(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/PaymentOptions.json`, BANKaddress)
                .then( response => {
                    if(response.status === 200){
                        this.props.user_exist();
                        this.refs.bank.state.value = '';
                        this.setState({successAddedAddress: true, accountBankNumber: '', accountBankNbBorderColor: '#4c4c4c'});
                        setTimeout(() => this.setState({successAddedAddress: false}), 2500)
                    }
                })
        }
    }

    saveLTCaddress = () => {
        if(this.state.litecoinAddressNumber.length >= 20){
            const LTCaddress = {
                LTCaddress: this.state.litecoinAddressNumber
            };

            axios.patch(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/PaymentOptions.json`, LTCaddress)
                .then( response => {
                    if(response.status === 200){
                        this.props.user_exist();
                        this.refs.ltc.state.value = '';
                        this.setState({successAddedAddress: true, litecoinAddressNumber: '', litecoinAddressBorderBottom: '#4c4c4c'});
                        setTimeout(() => this.setState({successAddedAddress: false}), 2500)
                    }
                })
        }
    }

    showPaymentsModal = () => {
        
        if(this.state.showPaymentsModal === true){
            this.setState({showPaymentsModal: false})
            return;
        }
        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/PaymentOptions.json`)
            .then( address => {
                if(address.data === null){
                    this.setState({
                        currentBTCAddress:'Brak',
                        currentLTCAddress:'Brak',
                        currentBANKAddres:'Brak'
                    })
                    return;
                }
                this.setState({
                    currentBTCAddress: address.data.BTCaddress,
                    currentLTCAddress: address.data.LTCaddress,
                    currentBANKAddres: address.data.BANKaddress
                })
            })
            .then(() => this.setState({showPaymentsModal: !this.state.showPaymentsModal}))
    }


    render() {
        return (
            <div className={classes.UserSettings}>
                {this.props.userExist.userPersonalDetails === null ? 
                <header>Ustawienia konta {this.state.successAddedAddress ? <span>Ustawienia zostały zapisane.</span> : null }</header>
                :
                <header>Witaj {this.props.userExist.userPersonalDetails.userNameAndSurname} w ustawieniach konta {this.state.successAddedAddress ? <span>Ustawienia zostały zapisane.</span> : null }</header>
                }
                
                <div className={classes.UserSettingsBox}>
                    <h2 onClick={this.showPaymentDetailsToggle}><i className="fas fa-cogs"></i>Twoje dane {this.state.showPaymentDetails ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i> }</h2>
                    {this.state.showPaymentDetails ? 
                    <div>
                        <p>Uzupełnij lub edytuj swoje dane personalne poniżej, aby wystawiać swoje aukcje.</p>
                        <h3>
                            <span>Uzupełnij swoje imię i nazwisko:</span>
                            <span className={classes.Wrapper}>
                                <DebounceInput
                                    ref="userNameAndSurname"
                                    minLength={8}
                                    debounceTimeout={200}
                                    maxLength={20}
                                    style={{borderBottom: `1px solid #4c4c4c`}}
                                    onChange={event => this.setState({userNameAndSurname: event.target.value})} />
                                <button onClick={this.saveUserNameAndSurname}>Zapisz</button>
                            </span>
                        </h3>
                    </div>
                    : null }
                </div>

                <div className={classes.UserSettingsBox}>
                    <h2 onClick={this.showPaymentOptionsToggle}><i className="far fa-credit-card"></i>Metody płatności {this.state.showPaymentOptions ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>}</h2>
                    {this.state.showPaymentOptions ? 
                    <div>
                        <p>Zdefiniuj swoje metody płatności, aby użytkownicy byli w stanie opłacić swoje zamówienie.</p>
                        <h3>
                            <span>Podaj adres bitcoin: </span>
                            <span className={classes.Wrapper}>
                                <DebounceInput
                                    ref="btc"
                                    minLength={26}
                                    debounceTimeout={200}
                                    maxLength={35}
                                    style={{borderBottom: `1px solid ${this.state.bitcoinAddressBorderBottom}`}}
                                    onChange={event => this.bitcoinAddressHandler(event.target.value)} />
                                <button disabled={this.state.bitcoinAddressIsCorrectly} onClick={this.saveBTCaddress}>Zapisz</button>
                            </span>
                        </h3>
                        <h3>
                            <span>Podaj adres litecoin: </span>
                            <span className={classes.Wrapper}>
                                <DebounceInput
                                    ref="ltc"
                                    minLength={20}
                                    debounceTimeout={200}
                                    maxLength={40}
                                    style={{borderBottom: `1px solid ${this.state.litecoinAddressBorderBottom}`}}
                                    onChange={event => this.litecoinAddressHandler(event.target.value)} />
                                <button disabled={this.state.litecoinAddressIsCorrectly} onClick={this.saveLTCaddress}>Zapisz</button>
                            </span>
                        </h3>
                        <h3>
                            <span>Podaj numer konta bankowego: </span>
                            <span className={classes.Wrapper}>
                                <DebounceInput
                                    ref="bank"
                                    minLength={1}
                                    debounceTimeout={200}
                                    maxLength={26}
                                    style={{borderBottom: `1px solid ${this.state.accountBankNbBorderColor}`}}
                                    onChange={event => this.accountBankNumberHandler(event.target.value)} />
                                <button disabled={this.state.accountNumberIsCorrectly} onClick={this.saveBANKaddress}>Zapisz</button>
                            </span>
                        </h3>
                        <h4 onClick={this.showPaymentsModal}>Zobacz swoje aktualne ustawienia płatności</h4>
                        {this.state.showPaymentsModal ? 
                            <div className={classes.PaymentModal}>
                                <h2 style={{cursor: 'inherit'}}>Aktuale ustawienia:</h2>
                                <span>Numer bitcoin: {this.state.currentBTCAddress === undefined ? <span style={{padding: '0px'}}>Brak</span> : this.state.currentBTCAddress}</span>
                                <span>Numer litecoin: {this.state.currentLTCAddress === undefined ? <span style={{padding: '0px'}}>Brak</span> : this.state.currentLTCAddress}</span>
                                <span>Numer konta bankowego: {this.state.currentBANKAddres === undefined ? <span style={{padding: '0px'}}>Brak</span> : this.state.currentBANKAddres}</span>
                            </div> : null 
                        }
                    </div>
                    : null }
                    <BackButton/>
                </div>
                {/* <div className={classes.UserSettingsBox}>
                            <h2 onClick={this.showPaymentDetailsToggle}><i className="fas fa-cogs"></i>Twoje aktualne ustawienia{this.state.showPaymentDetails ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i> }</h2>
                            {this.state.showPaymentDetails ? 
                            <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus autem ducimus deleniti officia quis nihil inventore doloremque amet ex. Fugiat assumenda eos excepturi perspiciatis reiciendis quae possimus beatae ex facilis ad sint, sequi fugit enim commodi iste explicabo praesentium architecto!</p></div>
                            : null }
                        </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList,
    userEmail: state.auctionList
});

export default connect(mapStateToProps, {user_exist})(UserSettings);
