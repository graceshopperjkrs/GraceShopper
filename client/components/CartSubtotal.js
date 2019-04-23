import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {gettingCartDetails} from '../store/cart'
/**
 * COMPONENT
 */
class disconnectedCartSubtotal extends React.Component {
  // calcSubtotal(){

  // }
  componentDidMount(){
      this.props.getCart()
  }

  render() {
   // console.log('cart subtotal', this.props)
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
        <h3> Subtotal: ${ Math.round(this.props.totalPrice*100.0)/100.0 } </h3>

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
  
  totalItems: state.AddItems.cart.length,
  cart: state.AddItems.cart,
  totalPrice: state.AddItems.cart.reduce((totalPx, el)=>{
    return  totalPx + (el.price * el.qty)/100.0
  },0),
  path: ownProps.path
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(gettingCartDetails())
})

export default connect(mapState, mapDispatch)(disconnectedCartSubtotal)
