import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
/**
 * COMPONENT
 */
class disconnectedCartSubtotal extends React.Component {
  render() {
    // console.log('cartsub', this.props)
    return (
      <div id="CartSubtotalBox">
        <h3>
          {' '}
          Your Cart has
          <br />
          {this.props.totalItems}{' '}
          {this.props.totalItems === 1 ? 'item' : 'items'}{' '}
        </h3>
        <h3> Subtotal: ${this.props.totalPrice} </h3>

        {this.props.path === 'Cart' ? (
          <Link to="/charge">
            <h1>Checkout</h1>
          </Link>
        ) : (
          <Link to="/cart">
            <h3>
              <i className="fa fa-shopping-cart" />
              Go to Cart
            </h3>
          </Link>
        )}
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  totalItems: state.AddItems.totalItems,
  totalPrice: state.AddItems.totalPrice,
  path: ownProps.path
})

export default connect(mapState, null)(disconnectedCartSubtotal)
