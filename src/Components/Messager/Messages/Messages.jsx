import React, { PureComponent } from 'react'
import classes from './Messages.css'
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'
import moment from 'moment';
import 'moment/locale/pl';
import { connect } from 'react-redux';
import SmallSpinner from '../../../UI/SmallSpinner/SmallSpinner';
import Aux from '../../../HOC/aux_x'

class Messages extends PureComponent {
    state = {
        userMessageID: [],
        acctualyUserId: '',
        messages: [],
        responseMessage: '',
        responseInputShow: false,
        userSendMessageId: '',
        productName: '',
        showAllMesages: false,
        spinnerIsLoading: false,
        messagesIsLoading: false
    }

    componentDidMount() {
        this.setState({messagesIsLoading: false})

        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/messages.json`)
            .then(response => {
                const userMessageIDUpdate = [];
                for(let key in response.data){
                    userMessageIDUpdate.push({
                        userMessageID: key
                    })
                }
                this.setState({userMessageID: userMessageIDUpdate})
            })
            .then(() => {
                this.setState({messagesIsLoading: true})
            })
    }

    refreshMessages = () => {
        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/messages/${this.state.acctualyUserId}.json`)
            .then(response => {
                const messagesUpdate = [];
                for(let key in response.data){
                    messagesUpdate.push({
                        message: response.data[key].message,
                        userSendMessageId: response.data[key].userSendMessageId,
                        productName: response.data[key].productName,
                        responseTime: response.data[key].responseTime
                    })
                }
                this.setState({ messages: messagesUpdate})
        })
    }

    showAllMesages = (userID) => {
        this.setState({acctualyUserId: userID, showAllMesages: false, spinnerIsLoading: true})
        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/messages/${userID}.json`)
            .then(response => {
                const messagesUpdate = [];
                for(let key in response.data){
                    messagesUpdate.push({
                        message: response.data[key].message,
                        userSendMessageId: response.data[key].userSendMessageId,
                        productName: response.data[key].productName,
                        responseTime: response.data[key].responseTime
                    })
                }
                this.setState({ messages: messagesUpdate})
            })
            .then(()=> this.setState({spinnerIsLoading: false, showAllMesages: true}))
    }

    sendResponse = () => {

        this.setState({spinnerIsLoading: true})
        const message = {
            userSendMessageId: this.props.userExist.userExist,
            message: this.state.responseMessage,
            productName: this.state.productName,
            responseTime: moment().format('LTS')
        }

        const fetchProductName = this.state.acctualyUserId.slice(28,58);

        axios.post(`https://shop-237ef.firebaseio.com/${this.state.userSendMessageId}/messages/${this.props.userExist.userExist+fetchProductName}.json`, message)
            .then( () => {
              axios.post(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/messages/${this.state.acctualyUserId}.json`, message)
                    .then( response => {if( response.status === 200){
                        this.setState({responseInputShow: false})
                        this.refreshMessages();
                        }
                    })
                    .then(() => this.setState({spinnerIsLoading: false}))
            })
    }

    responseInputShow = (userSendMessageId, productName) => {
        this.setState({ 
            userSendMessageId: userSendMessageId,
            productName:productName,
            responseInputShow: !this.state.responseInputShow
        })
    }

    deleteMessage = (deleteMessageAuctionID) =>{

        axios.delete(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/messages/${deleteMessageAuctionID}.json`)
            .then( response =>{
                if(response.status === 200){
                    const messages = this.state.userMessageID.filter( message => {
                        return message.userMessageID !== deleteMessageAuctionID;
                    })
                    this.setState({userMessageID: messages})
                }
            })
    }

    backToMainMessageBox = () => {
        this.setState({showAllMesages: false, responseInputShow: false})
    }

    backToMainPage = () =>{
        document.body.style.overflow = "visible";
        this.props.history.push('/')
    }

    render() {
        console.log( this.state)
        let userMessageID = this.state.userMessageID.map( (userID, index) => {
            return (
                <div key={index} className={classes.messageUser}>
                    <h5>Wiadomości do aukcji {userID.userMessageID.slice(28,58)}</h5>
                    <div>
                        <button className={classes.showMsgBtn} onClick={() => this.showAllMesages(userID.userMessageID)}>Pokaż wiadomości</button>
                        <button className={classes.deleteMsgBtn} onClick={() => this.deleteMessage(userID.userMessageID)}>Usuń</button>
                    </div>
                </div>
            )
        })
        let messages = this.state.messages.map( (message, index) => {
            if(message.userSendMessageId === this.props.userExist.userExist){
                return (
                <div key={index} className={classes.MessagesBoxOwn}>
                    <span className={classes.spanTime}>{message.responseTime}</span>
                    <span className={classes.spanProductName}>{message.productName}</span>
                    <p style={{textAlign: 'justify', fontSize: '14px', maxWidth: '75%'}}>{message.message}</p>
                </div>
                )
            }
            return (
                <div key={index} className={classes.MessagesBox}>
                    <h3>Pytanie do aukcji {message.productName}</h3>
                    <div>
                        <span className={classes.spanTime}>{message.responseTime}</span>
                        <p style={{textAlign: 'justify', fontSize: '14px', maxWidth: '75%'}}>{message.message}</p>
                        <button onClick={() => this.responseInputShow(message.userSendMessageId, message.productName)}><i className="fas fa-envelope"></i></button>
                    </div>
                </div>
            )

        })
        return (
            <div className={classes.Messages}>
                {this.state.spinnerIsLoading ? <SmallSpinner/> : null}
                
                {this.state.messagesIsLoading ? 
                    <Aux>
                        {this.state.showAllMesages ? 
                            <header><button onClick={this.backToMainMessageBox}>Wróć</button>Twoja korespondencja</header> : 
                            <header><button onClick={this.backToMainPage}>Wyjdź</button> Skrzynka odbiorcza: ({this.state.userMessageID.length})</header>
                        }
                        
                        <div className={classes.MessagesDisplayFlex}>
                            {this.state.showAllMesages ? messages : userMessageID }
                        </div>
                    </Aux>
                : null }

                {this.state.responseInputShow ?
                    <div className={classes.replyBox}>
                        <DebounceInput
                            id="lessThanInput"
                            value={this.state.searchPrice}
                            minLength={1}
                            placeholder="Wpisz odpowiedź..."
                            debounceTimeout={300}
                            onChange={ event => this.setState({responseMessage: event.target.value})} />
                        <button onClick={this.sendResponse}>Wyślij odpowiedź</button>
                    </div> : null 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});


export default connect(mapStateToProps)(Messages);