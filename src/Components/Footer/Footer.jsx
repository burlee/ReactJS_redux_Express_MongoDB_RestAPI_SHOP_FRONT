import React, { Component } from 'react'
import classes from './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className={classes.Footer}>
        <div className={classes.socialMedia}>
            <h2>Media</h2>
            <ul>
                <li>Facebook<i className="fab fa-facebook-f"></i></li>
                <li>Twiter<i className="fab fa-twitter"></i></li>
                <li>Google<i className="fab fa-google-plus-g"></i></li>
            </ul>
        </div>

        <div className={classes.Information}>
          <h2>Informacje</h2>
        </div>

        <div className={classes.Links}>
          <h2>Linki</h2>
          <ul>
            <li>Regulamin</li>
            <li>Opinie</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    )
  }
}
