import React, { Component } from 'react';
import classes from './RouteInformation.css';
import { withRouter } from 'react-router-dom';

class RouteInformation extends Component {
  render() {
    return (
        <div className={classes.RouteInformation}>
            <h1>
            Musisz być zalogowany
            <button onClick={()=> this.props.history.push('/')}>X</button>
            </h1>
        </div>
    )
  }
}


export default withRouter(RouteInformation);
