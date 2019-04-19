import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const CartSubtotal = props => {
  return (
    <div id="CartSubtotalBox">
      <h3> Your Cart has xx items </h3>
      <h3> Subtotal: </h3>

      {props.path === 'Cart' ? (
        <h1>Checkout</h1>
      ) : (
        <Link to={`/cart`}>
          <h1>
            <i className="fa fa-shopping-cart" />
            Go to Cart
          </h1>
        </Link>
      )}
    </div>
  )
}
