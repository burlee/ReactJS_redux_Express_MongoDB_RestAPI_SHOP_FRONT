import React from 'react'
import classes from './ProductDisplay.css'

export default (props) => {
  return (
    <div className={classes.ProductDisplay}>
      <span>{props.productName}</span>
    </div>
  )
}
