import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FirebaseConfig from '../../FirebaseConfig';
import Aux from '../../HOC/aux_x';
import classes from './RegisterModul.css';

class RegisterModul extends Component {
    state = {
        userDetails: {
            email: '',
            password: '',
            returnSecureToken: true
        },
        error: false,
        message: ''
    }

    emailValue = (event) => {
        const emailValue = event.target.value;
        const userDetails = this.state.userDetails;
        userDetails.email = emailValue;
        console.log(userDetails)
        this.setState({ userDetails: userDetails })
    }

    passwordValue = (event) => {
        const userDetails = this.state.userDetails;
        const passwordValue = event.target.value;
        userDetails.password = passwordValue;
        this.setState({ userDetails: userDetails })
    }

    getUserDetails = (event) => {
        
        event.preventDefault();
        const authData = { ...this.state.userDetails }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDVjDPro5DtgBtfT1wOxo-yWqIU4TaN0I4', authData)
            .then(response => {
                console.log(response.status)
                if(response.status === 200){
                    this.setState({message: 'Konto zostało utworzone'})
                }
                setTimeout(() => this.setState({message: ''}),2500);
            })
            .catch(() => {
                this.setState({message: 'Sprawdź poprawność danych'});
                setTimeout(() => this.setState({message: ''}),2500)
            })
    }

    closeRegisterModule = () => {
        this.props.history.push('/')
    }

    LOGOUT = () => {
        FirebaseConfig.auth().signOut();
    }
    render() {
        return (
            <Aux>
                {/* <div className={classes.Backdrop} onClick={this.closeRegisterModule}> */}
                {/* </div> */}
                <div className={classes.RegisterModule}>
                    <div className={classes.InformationBox}>
                        <div>
                            <h1>1</h1>
                            <p>Zaloz swoje konto obok</p>
                        </div>
                        <div>
                            <h1>2</h1>
                            <p>Zaloguj się na stworzone konto</p>
                        </div>
                        <div>
                            <h1>3</h1>
                            <p>Wystawiaj aukcje i korzystaj z serwisu</p>
                        </div>
                    </div>
                    <div className={classes.Register}>
                        <form onSubmit={this.getUserDetails}>
                            <label htmlFor="email">Podaj adres e-mail:</label>
                            <input onChange={this.emailValue} type="email" id="email" autoComplete="off" />
                            <label htmlFor="password">Hasło:</label>
                            <input onChange={this.passwordValue} type="password" id="password" />
                            <button>Zarejestruj</button>
                        </form>
                        <a href="/">zamknij</a>
                        {/* <button onClick={this.LOGOUT}>Wyloguj się</button>  */}
                        <h3>{this.state.message}</h3>
                    </div>
                </div>
            </Aux>

        )
    }
}

export default withRouter(RegisterModul);