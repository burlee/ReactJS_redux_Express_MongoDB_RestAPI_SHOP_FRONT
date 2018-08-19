import React, { Component } from 'react'
import classes from './LoginModule.css'
import { DebounceInput } from 'react-debounce-input';
import FirebaseConfig from '../../FirebaseConfig';
import Aux from '../../HOC/aux_x';
import { withRouter } from 'react-router-dom'


class LoginModule extends Component {
    state = {
        email: '',
        password: '',
        LoginStatusFontColor: ''
    }

    logginUser = (event) => {
        event.preventDefault();
        FirebaseConfig.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                this.setState({ LoginStatusFontColor: '#4caf50' })
                setTimeout(() => this.props.history.push('/') , 3000)
                }
            )
            .catch((() => {
                this.setState({ LoginStatusFontColor: '#f44336' })
            }));
    }

    emailValueHandler = (event) =>{
        this.setState({ email: event.target.value })
        if(event.target.value === ''){
            this.setState({LoginStatusFontColor: ''})
        }
    }

    closeLoginModule = () =>{
        this.props.history.push('/');
    }
    render() {
        
        return (
            <Aux>
                <div className={classes.Backdrop} onClick={this.closeLoginModule}>
                </div>
                <div className={classes.LoginModule}>
                    {/* <h3>{this.state.message}</h3> */}
                    <form onSubmit={this.logginUser}>
                        <label htmlFor="email">Podaj adres e-mail:</label>
                        <DebounceInput
                            style={{color: `${this.state.LoginStatusFontColor}`}}
                            id="email"
                            autoComplete="off"
                            minLength={2}
                            debounceTimeout={250}
                            onChange={event => this.emailValueHandler(event)} />
                        <label htmlFor="password">Hasło:</label>
                        <DebounceInput
                            style={{color: `1px solid ${this.state.LoginStatusFontColor}`}}
                            type="password"
                            id="password"
                            minLength={2}
                            debounceTimeout={250}
                            onChange={event => this.setState({ password: event.target.value })} />
                        <button>Zaloguj</button>
                    </form>
                </div>
            </Aux>
        )
    }
}

export default withRouter(LoginModule)