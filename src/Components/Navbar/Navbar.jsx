import React, { Component } from 'react'
import classes from './Navbar.css';
import MainLogo from '../../UI/MainLogo/MainLogo'
import Search from '../Search/Search';
import ShopCart from '../ShopCart/ShopCart';

export default class Navbar extends Component {
    state = {
        searchTerm: ''
    }

  render() {
        return (
            <div className={classes.Navbar}>
                {/* <MainLogo/> */}
                <ShopCart/>
                <Search/>
            </div>
        )
    }
}
