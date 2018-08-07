import React, { Component } from 'react';
import classes from './Account.css';
import Aux from '../../HOC/aux_x';
import { Switch, Route, NavLink } from 'react-router-dom';

export default class Account extends Component {
    state = {
        showAccountOptions: false
    }

    showAccountOptions = () => {
        this.setState({showAccountOptions: !this.state.showAccountOptions})
    }

    render() {
        return (
            <Aux>
                <div className={classes.Account}>
                    <button onClick={this.showAccountOptions}>Ustawienia</button>
                    {this.state.showAccountOptions ? 
                    <div className={classes.AccountOptions}>
                        <ul>
                            <li><NavLink to="/wystaw-przedmiot">Wystaw przedmiot</NavLink></li>
                            <li><NavLink to="/wystaw-przedmiot">Wystaw przedmiot</NavLink></li>
                            <li><NavLink to="/wystaw-przedmiot">Wystaw przedmiot</NavLink></li>
                            <li><NavLink to="/wystaw-przedmiot">Wystaw przedmiot</NavLink></li>
                            <li><NavLink to="/wystaw-przedmiot">Wystaw przedmiot</NavLink></li>
                        </ul>
                    </div> : null }
                </div>
                <Switch>
                    {/* <Route path='/wystaw-przedmiot' exact component={CompletePanel} /> */}
                </Switch>
            </Aux>
        )
    }
}
