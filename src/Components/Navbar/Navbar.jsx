import React, { Component } from 'react'
import classes from './Navbar.css';
import Account from '../Account/Account';
import MainLogo from '../../UI/MainLogo/MainLogo'
import Search from '../Search/Search';
import ShopCart from '../ShopCart/ShopCart';

export default class Navbar extends Component {
    state = {
        searchTerm: '',
        navbarPosition: 'absolute',
        navbarHeight: 100
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    
    handleScroll = (e) => {
        const clientY = window.scrollY;
        if( clientY > 50){
            this.setState({
                navbarPosition: 'fixed', 
                navbarHeight: 80
        })
        }else{
            this.setState({
                navbarPosition: 'absolute', 
            navbarHeight: 100}
        )}
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div className={classes.Navbar} 
                 style={{ 
                    position: this.state.navbarPosition, 
                    height: this.state.navbarHeight + 'px'
                 }}>
                <MainLogo/>
                <Search/>
                <Account />
                <ShopCart/>
            </div>
        )
    }
}
