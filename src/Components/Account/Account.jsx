import React, { Component } from 'react';
import classes from './Account.css';
import Aux from '../../HOC/aux_x';
import { Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

class Account extends Component {
    state = {
        showAccountOptions: false,
        userExist: this.props.userExist.userExist
    }

    showAccountOptions = () => {
        this.setState({showAccountOptions: !this.state.showAccountOptions})
    }

    render() {
        console.log( this.state.userExist)
        return (
            <Aux>
                {this.state.userExist === null ? <p>Zaloz konto</p> :
                <div className={classes.Account}>
                    <button onClick={this.showAccountOptions}>Ustawienia</button>
                    {this.state.showAccountOptions ? 
                    <div className={classes.AccountOptions}>
                        <ul>
                            <li><NavLink to="/wystaw-przedmiot">Wystaw przedmiot</NavLink></li>
                        </ul>
                    </div> : null }
                </div>}
                <Switch>
                    {/* <Route path='/wystaw-przedmiot' exact component={CompletePanel} /> */}
                </Switch>
            </Aux>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
  });
  

export default connect(mapStateToProps)(Account);
