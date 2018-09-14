import React, { Component } from 'react'
import classes from './ProductMapLocalization.css'
import GoogleMapReact from 'google-map-react';
import MapDiv from './MapDiv'
export default class ProductMapLocalization extends Component {
  state = {
    zoom: 12
  }

  render() {
    return (
      <div className={classes.ProductMapLocalization}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDoXg87F7Bl_o-xG0ZY5D3ov9jL1meXQQg' }}
            center={this.props.coordinates}
            defaultZoom={this.state.zoom}>
                   
          <MapDiv 
            lat={this.props.lat}
            lng={this.props.lng}/>

        </GoogleMapReact>         
      </div>
    )
  }
}
