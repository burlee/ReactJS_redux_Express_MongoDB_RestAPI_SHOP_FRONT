import classes from './BackButton.css'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class BackButton extends Component {

    backToMainPage = () => {
        this.props.history.push('/');
        document.body.style.overflow = "visible";
    }

    render() {
        return (
            <button onClick={this.backToMainPage} className={classes.BackButton}>
                Wyjdź
            </button>
        )
    }
}


export default  withRouter(BackButton);

