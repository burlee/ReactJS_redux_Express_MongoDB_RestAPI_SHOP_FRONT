import React, { Component } from 'react'
import classes from './CommentModule.css'
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'

export default class CommentModule extends Component {
    state = {
        commentDescription: '',
        btnColor: '#4c4c4c',
        communicat: ''
    }

    addNewComment = () => {
        if(this.state.commentDescription === ''){
            this.setState({btnColor: '#f44336'})
            setTimeout(() => this.setState({btnColor: '#4c4c4c'}), 2500)
            return;
        }
        
        const comment = {
            commentDescription: this.state.commentDescription,
            auctionOwnerId: this.props.auctionOwnerId
        }

        axios.post('http://localhost:3000/comments/', comment)
            .then( response => {

                if(response.status === 201){
                    this.setState({communicat: 'Opinia została dodana'})
                    setTimeout(() => this.setState({communicat: ''}), 3000);
                    setTimeout(() => this.props.closeCommentModule(), 5000)
                }
            })
            .catch(error => alert(error))
    }

    render() {
        return (
            <div className={classes.CommentModule}>
                <label htmlFor="comment">Wystaw komentarz</label>
                <DebounceInput 
                    minLength={15}
                    debounceTimeout={500}
                    element="textarea" 
                    onChange={ event => this.setState({commentDescription: event.target.value})} 
                    name="messageValue" 
                    id="comment" 
                />
                <button 
                    style={{backgroundColor: this.state.btnColor}}
                    onClick={this.addNewComment}>Dodaj komentarz</button>
                <h5>{this.state.communicat}</h5>
            </div>
        )
    }
}
