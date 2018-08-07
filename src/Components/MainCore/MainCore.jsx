import React, { Component } from 'react';
import classes from './MainCore.css';
import axios from 'axios';
import Aux from '../../HOC/aux_x'
import { Switch, Route, NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ProductContainer from '../ProductContainer/ProductContainer';
import ProductDetails from '../ProductDetails/ProductDetails';


export default class MainCore extends Component {
  render() {
    return (
      <Aux>
        <Navbar/>
        <ProductDetails/>
        <ProductContainer/>
      </Aux>
    )
  }
}
