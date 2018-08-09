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
        error: false
    }

    logginUser = (event) => {
        console.log( this.state )
        event.preventDefault();
        FirebaseConfig.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                console.log( response )
                this.props.history.push('/');
                }
            )
            .catch((() => {
                this.setState({ error: true })
                console.log('Błąd logowania...')
            }));
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
                    <form onSubmit={this.logginUser}>
                        <label htmlFor="email">Podaj adres e-mail:</label>
                        <DebounceInput
                            id="email"
                            autoComplete="off"
                            minLength={2}
                            debounceTimeout={250}
                            onChange={event => this.setState({ email: event.target.value })} />
                        <label htmlFor="password">Hasło:</label>
                        <DebounceInput
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