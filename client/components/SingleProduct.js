import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const SingleProduct = props => {
  const {name, imageUrl, price, id} = props.product

  return (
    <div>
      <Link to={`/products/${id}`}>
        <h1>{name}</h1>
      </Link>
      <h3>Price: ${price}</h3>
      <img src={imageUrl} />
    </div>
  )
}
