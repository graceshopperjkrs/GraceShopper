import React, { Component } from 'react'

import { connect } from 'react-redux'
import SingleProduct from './SingleProduct'

import CartSubtotal from './CartSubtotal'
import { gettingCartDetails } from '../store/cart'

/**
 * COMPONENT
 */

class disconnectedCart extends Component {
  constructor (props) {
    super(props)
    this.state = { changeQty: false }
    // this.handleEditCartChange = this.handleEditCartChange.bind(this)
    this.singleProductChanged = this.singleProductChanged.bind(this)
  }

  componentDidMount () {
    this.props.fetchItems()
  }

  singleProductChanged () {
    this.setState({ changeQty: true })
    this.props.fetchItems()
    // console.log('after singleProduct Changed from Cart: ', this.props.cartList)
  }

  render () {
    // if (this.props.cartList) {//console.log(this.props.cartList[0]) }
    if (!this.props.cartList) return 'Cart is Still Empty.  Please add items' // or cart is empty
    return (
      <div className='RowContainer'>
        <div className='ColumnContainer'>
          <ul>
            {this.props.cartList.map(product => (
              <li key={product.productId}>
                <SingleProduct
                  product={product}
                  path='Cart'
                  singleProductChanged={this.singleProductChanged}
                />
              </li>
            ))}
          </ul>
        </div>
        <CartSubtotal path='Cart' />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cartList: state.AddItems.cart,
    user: state.user,
    selected: state.SelectedProduct
  }
}

const mapDispatch = dispatch => ({
  fetchItems: () => dispatch(gettingCartDetails())
})

export default connect(
  mapState,
  mapDispatch
)(disconnectedCart)

/**
 * PROP TYPES
 */
// Cart.propTypes = {
// email: PropTypes.string
// }
