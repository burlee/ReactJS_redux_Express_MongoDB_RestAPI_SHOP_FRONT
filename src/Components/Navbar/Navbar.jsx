import React, { Component } from 'react'
import classes from './Navbar.css';
import Search from '../Search/Search';
import ShopCart from '../ShopCart/ShopCart';

export default class Navbar extends Component {
    state = {
        showSearch: false
    }

    showSearchToggle = () => {
        this.setState({showSearch: !this.state.showSearch})
    }

    render() {
        return (
            <nav className={classes.Navbar} style={{ backgroundColor: this.props.bgColor }}>
                {/* <MainLogo/> */}
                <ShopCart />
                    <div style={{cursor: 'pointer'}} onClick={this.showSearchToggle}>
                        {this.state.showSearch ? 
                        <div className={classes.RotateCloseBtn}>
                            <i className="fas fa-times"></i>
                        </div>
                        :
                        <i className="fas fa-search"></i>
                        }
                    </div>
                {this.state.showSearch ? <Search bgColor={this.props.bgColor}/> : null}
            </nav>
        )
    }
}
