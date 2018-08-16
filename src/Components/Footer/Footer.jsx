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
         Informaton
        </div>

        <div className={classes.Links}>
            Links
        </div>
      </div>
    )
  }
}
