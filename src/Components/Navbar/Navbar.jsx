import React, { Component } from 'react'
import classes from './Navbar.css';
import Search from '../Search/Search';
import ShopCart from '../ShopCart/ShopCart';

export default class Navbar extends Component {

  render() {
        return (
            <nav className={classes.Navbar} style={{backgroundColor: this.props.bgColor}}>
                {/* <MainLogo/> */}
                <ShopCart/>
                <Search/>
            </nav>
        )
    }
}
