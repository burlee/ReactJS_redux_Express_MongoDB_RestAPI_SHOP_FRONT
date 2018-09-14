import React from 'react'

export default ({lat, lng}) => {
  return (
    <div 
        lat={lat}
        lng={lng}
        style={{border: '1px solid #808080', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgb(0, 127, 0, .2)'}}> 
    </div>
  )
}
