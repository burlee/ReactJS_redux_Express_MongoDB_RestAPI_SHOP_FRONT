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
        type: 'password',
        error: false,
        message: '',
        borderColorPassword: '#808080',
        borderColorEmail: '#808080',
        emailIsCorrectly: false,
        passwordIsCorrectly: false
    }

    emailValue = (event) => {
        const emailValue = event.target.value;
        const userDetails = this.state.userDetails;

        userDetails.email = emailValue;
        this.setState({ userDetails: userDetails })

        this.emailValidate(this.state.userDetails.email)
    }

    passwordValue = (event) => {

        const userDetails = this.state.userDetails;
        const passwordValue = event.target.value;
        
        userDetails.password = passwordValue;
        this.setState({ userDetails: userDetails });

        this.passwordValidate(this.state.userDetails.password);
    }

    sendRegisterForm = (event) => {
        event.preventDefault();
        
        const authData = { ...this.state.userDetails };

        //Password regex validation, email is validate by firebase.
        let passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if( passwordValidate.test(authData.password) === false) return;

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDVjDPro5DtgBtfT1wOxo-yWqIU4TaN0I4', authData)
            .then(response => {
                if(response.status === 200){
                    this.setState({message: 'Rejestracja przebiegła pomyślnie.'})
                }
                setTimeout(() => this.setState({message: ''}),2500);
            })
            .catch(() => {
                this.setState({message: 'Uzupełnij poprawnie formularz.'});
                setTimeout(() => this.setState({message: ''}),2500)
            })
    }

    //current input value validation with change border color
    passwordValidate = (password) =>{
        
        let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        if( strongRegex.test(password) === false){
            this.setState({borderColorPassword: 'red', disabled: true, passwordIsCorrectly: false})
        }else{
            this.setState({borderColorPassword: '#4caf50', disabled: false, passwordIsCorrectly: true})
        }
        if(password === ''){
            this.setState({borderColorPassword: 'gray'})
        }
    }

    //current input value validation with change border color
    emailValidate = (email) => {

        let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/;

        if( emailRegex.test(email) === false){
            this.setState({borderColorEmail: 'red', emailIsCorrectly: false})
        }else{
            this.setState({borderColorEmail: '#4caf50', emailIsCorrectly: true})
        }
        if(email === ''){
            this.setState({borderColorEmail: 'gray'})
        }
    }

    changeTypePassword = () => {
        if(this.state.type === 'text'){
            this.setState({type: 'password'})
        }else{
            this.setState({type: 'text'})
        }
    }
    
    closeRegisterModule = () => {
        this.props.history.push('/');
        document.body.style.overflow = "visible";
    }
    
    render() {
        let registerButton = <button disabled={true}>Zarejestruj</button>

        if(this.state.emailIsCorrectly && this.state.passwordIsCorrectly){
            registerButton = <button disabled={false}>Zarejestruj</button>
        }

        return (
            <Aux>
                <div className={classes.RegisterModule}>
                    <div className={classes.RegisterForm}>
                        <form onSubmit={this.sendRegisterForm}>
                            <label htmlFor="email">Podaj adres e-mail:</label>
                            <input style={{borderBottom: `1px solid ${this.state.borderColorEmail}`}} onChange={this.emailValue} type="email" id="email" autoComplete="off" />
                                <label htmlFor="password">
                                Hasło: 
                                {this.state.type === "password" ? 
                                    <i onClick={this.changeTypePassword} style={{fontSize: '20px', cursor: 'pointer'}} className="far fa-eye-slash"></i> :
                                    <i onClick={this.changeTypePassword} style={{fontSize: '20px', cursor: 'pointer'}} className="far fa-eye"></i> 
                                }
                                </label>
                            <input style={{borderBottom: `1px solid ${this.state.borderColorPassword}`}} onChange={this.passwordValue} type={this.state.type} id="password" />
                            {registerButton}
                        </form>
                        <h3 style={{fontSize: '15px', color: '#4c4c4c'}}>{this.state.message}</h3>
                    </div>
                    <button className={classes.CloseRegisterModuleBtn} onClick={this.closeRegisterModule}>Zamknij</button>
                </div>
            </Aux>

        )
    }
}

export default withRouter(RegisterModul);