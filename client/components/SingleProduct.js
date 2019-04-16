import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const SingleProduct = props => {
  const {name, imageUrl, description, price, id} = props

  return (
    <div>
      <Link to={`/products/${id}`}>
        <h1>{name}</h1>
      </Link>
      <h3>Price: ${price}</h3>
      <img src={imageUrl} />
      <p>Product Description:{description}</p>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    getSelectedProduct: id => {
      dispatch(getSelected(id))
    }
  }
}

export default connect(null, mapDispatch)(SingleProduct)
