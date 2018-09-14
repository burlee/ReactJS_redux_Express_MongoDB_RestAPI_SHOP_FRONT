import React, { Component } from 'react'
import classes from './CommentsContainer.css'
import axios from 'axios';
import Aux from '../../../HOC/aux_x';

export default class CommentsContainer extends Component {
    state = {
        comments: [],
        showComments: false
    } 

    componentDidMount(){
        axios.get(`http://localhost:3000/comments/${this.props.allUserCommentsUserID}`)
            .then( response => {
                const updateComments = [];
                for(let key in response.data.comments){
                    updateComments.push({
                        commentDescription: response.data.comments[key].commentDescription,
                        id: response.data.comments[key].id
                    })
                }
                this.setState({comments: updateComments})
            })
            .then(()=> this.setState({showComments: true}))
    }

    render() {
        let displayUserComments = <div style={{border: 'none', textAlign:'center'}}><span>Sprzedający nie posiada żadnych komentarzy.</span></div>;

        if(this.state.comments.length !== 0){
            displayUserComments = this.state.comments.map( comment => {
                return (
                <div key={comment.id} className={classes.DisplayComment}>
                    <p>{comment.commentDescription}</p>
                </div>)
            })
        }
        return (
            <div className={classes.CommentsContainer}>
                <button onClick={this.props.backToProductDetails}>Wróć</button>
                {this.state.showComments ? 
                <Aux>
                    {displayUserComments}
                </Aux>
                : null }
            </div>
        )
    }
}
