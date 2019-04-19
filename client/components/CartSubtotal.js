import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const CartSubtotal = props => {
    return ( 
        <div className="CartSubtotalBox">
         
        <h3> Your Cart has xx items </h3>
        <h3> Subtotal: </h3>
         
          <Link to={`/cart`}>
            <h1> (put icon here) Go to Cart</h1>
          </Link>
          </div>

        
    )}
