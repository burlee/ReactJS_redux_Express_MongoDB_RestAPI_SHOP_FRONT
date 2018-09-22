import React, { Component } from 'react'
import classes from './Messager.css'
import Aux from '../../HOC/aux_x';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pl';
import { DebounceInput } from 'react-debounce-input'

export default class Messager extends Component {
  state = {
    message: '',
    communicat: '',
    SendMessageToUserBtn: false
  }

  sendMessageToUser = () => {
    if(this.props.userLogginID === this.props.userIdFromFirebase){
      this.setState({communicat: 'To twoja aukcja'})
      return;
    }
    if(this.state.message.length < 10){
      this.setState({communicat: 'Twoja wiadomość jest za krótka'})
      return;
    }
    this.setState({SendMessageToUserBtn: true})

    const message = {
      userSendMessageId: this.props.userLogginID,
      message: this.state.message,
      productName: this.props.productName,
      responseTime: moment().format('LTS')
    };
  
    axios.post(`https://shop-237ef.firebaseio.com/${this.props.userIdFromFirebase}/messages/${this.props.userLogginID+message.productName}.json`, message)
      .then( response => {
        if(response.status === 200){
          this.setState({communicat: 'Wiadomość została wysłana'})
          setTimeout(() => this.props.closeBackdrop(), 3000)
        }
      })
      .catch( error => console.log(error))

    axios.post(`https://shop-237ef.firebaseio.com/${this.props.userLogginID}/messages/${this.props.userIdFromFirebase+message.productName}.json`, message)

  }

  render() {
    return (
      <Aux>
      <div className={classes.Backdrop} onClick={this.props.closeBackdrop}></div>
        <div className={classes.Messager}>
          <label htmlFor="message">Wyślij wiadomość do sprzedającego</label>
          <DebounceInput 
              minLength={15}
              debounceTimeout={500}
              element="textarea" 
              style={{width: '90%', height: '60%'}} 
              onChange={ event => this.setState({message: event.target.value})} 
              name="messageValue" 
              id="message" 
          />
          <button disabled={this.state.SendMessageToUserBtn} onClick={this.sendMessageToUser}>Wyślij</button>
          <h4>{this.state.communicat}</h4>
        </div>
      </Aux>
    )
  }
}
