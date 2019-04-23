import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SingleProduct } from './SingleProduct'
import CartSubtotal from './CartSubtotal'
import {
  editingItemsInCart,
  removingItemsFromCart,
  gettingCartDetails
} from '../store/cart'
import { getSelected } from '../store/product'
/**
 * COMPONENT
 */

class disconnectedCart extends Component {
  constructor (props) {
    super(props)
    this.state = { changeQty: 0 }
    this.handleEditCartChange = this.handleEditCartChange.bind(this)
  }

  componentDidMount () {
    // this.setState({loading: false})
    this.props.fetchItems()
    //console.log(this.props.cartList, 'Cart List from cart.js ')

    // console.log(this.state.loading)
  }

  handleEditCartChange (evt, id) {
    console.log('changing products', evt.target, id )
    const prodObj = { id: Number(id), qty: Number(evt.target.value) }

    this.setState({ changeQty: this.state.changeQty + evt.target.value })
    console.log('***********State', this.state)
    this.props.editingItemsInCart(prodObj)
    this.props.fetchItems()
  }

  render () {
    if (this.props.cartList) {console.log(this.props.cartList[0]) }
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
                  handleEditCartChange={this.handleEditCartChange}
                  handleEditCartSubmit={this.handleEditCartSubmit}
                  deleteItem={this.props.deleteItem}
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
  fetchItems: () => dispatch(gettingCartDetails()),
  deleteItem: prodId => dispatch(removingItemsFromCart(prodId)),
  editingItemsInCart: productObj => dispatch(editingItemsInCart(productObj)),
  getSelectedProduct: prodId => {
    dispatch(getSelected(prodId))
  }
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
