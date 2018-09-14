import React from 'react'

export default ({lat, lng}) => {
  return (
    <i 
        style={{fontSize: '40px'}}
        lat={lat}
        lng={lng}
        className="fas fa-map-marker-alt">
    </i>
  )
}
