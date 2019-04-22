import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SingleProduct} from './SingleProduct'
import {CartSubtotal} from './CartSubtotal'
import {
  editingItemsInCart,
  removingItemsFromCart,
  gettingCartDetails
} from '../store/cart'

/**
 * COMPONENT
 */

class disconnectedCart extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   loading: true
    // }

    this.handleEditCartChange = this.handleEditCartChange.bind(this)
    //  this.handleEditCartSubmit = this.handleEditCartSubmit.bind(this)
  }

  componentDidMount() {
    // this.setState({loading: false})
    this.props.fetchItems()
    console.log(this.props.cartList, 'Cart List from cart.js ')

    // console.log(this.state.loading)
  }

  handleEditCartChange(evt, id) {
    console.log('change', evt.target.value)
    console.log('cart Change Event id: ', id)
    const prodObj = {id, purchaseQuantity: evt.target.value}
    props.editQty(prodObj)
  }

  render() {
    // const cartList = this.props.cartList
    // const cartList = [{name: 'name', imageUrl:'http://dummyimage.com/192x121.jpg/5fa2dd/ffffff' , price:2, qty: 10, id:1} ]
    console.log('user props', this.props.user.id)
    if (!this.props.cartList) return 'Cart is Still Empty.  Please add items' // or cart is empty
    return (
      <div className="RowContainer">
        <div className="ColumnContainer">
          <ul>
            {this.props.cartList.map(product => (
              <li key={product.productId}>
                <SingleProduct
                  product={product}
                  path="Cart"
                  handleEditCartChange={this.handleEditCartChange}
                  handleEditCartSubmit={this.handleEditCartSubmit}
                  deleteItem={this.props.deleteItem}
                />
              </li>
            ))}
          </ul>
        </div>
        <CartSubtotal path="Cart" />
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
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  fetchItems: () => dispatch(gettingCartDetails()),
  deleteItem: prodId => dispatch(removingItemsFromCart(prodId)),
  editQty: productObj => dispatch(editingItemsInCart(productObj))
})

export default connect(mapState, mapDispatch)(disconnectedCart)

/**
 * PROP TYPES
 */
// Cart.propTypes = {
// email: PropTypes.string
// }
