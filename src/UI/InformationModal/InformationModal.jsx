import React, { Component } from 'react';
import classes from './InformationModal.css';

class InformationModal extends Component {
  render() {
    return (
        <div className={classes.InformationModal}>
            <h1>
            Musisz być zalogowany
            <button onClick={this.props.closeInformationModal}>X</button>
            </h1>
        </div>
    )
  }
}


export default InformationModal;
