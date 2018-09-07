import React, { Component } from 'react'
import classes from './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className={classes.Footer}>
        <div className={classes.socialMedia}>
            <h2>Media</h2>
            <ul>
                <li>Facebook<i className="fab fa-facebook-f"></i></li>
                <li>Twiter<i className="fab fa-twitter"></i></li>
                <li>Google<i className="fab fa-google-plus-g"></i></li>
            </ul>
        </div>

        <div className={classes.Newsletter}>
          <h2>Newsletter</h2>
          <p>Zapisz się i otrzymuj najnowsze informacje</p>
          <div className={classes.NewsletterBox}>
            <input placeholder="Podaj swój adres email..." type="text"/>
            <button>Zapisz</button>
          </div>
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
      </footer>
    )
  }
}
