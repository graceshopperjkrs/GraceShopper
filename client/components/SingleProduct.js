import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const SingleProduct = props => {
    
const {name,imageUrl,description,price} = props

  return (
    <div>
      <h1>{name}</h1>
      <h3>Price: ${price}</h3>
      <img src={imageUrl} /> 
      <p>Product Description:{description}</p>
    </div>
  )
}