import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SingleProduct} from './SingleProduct'
import CartSubtotal from './CartSubtotal'
import {editingItemsInCart, removingItemsFromCart} from '../store/cart'
import {getSelected} from '../store/product'
/**
 * COMPONENT
 */

class disconnectedCart extends Component {
  constructor(props) {
    super(props)
    this.handleEditCartChange = this.handleEditCartChange.bind(this)
   
  }



  handleEditCartChange(evt, id) {
    const prodObj = {id: Number(id), purchaseQuantity: Number(evt.target.value)}
   
    this.props.editingItemsInCart(prodObj)
  }

  render() {
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
    selected: state.SelectedProduct
  }
}

const mapDispatch = dispatch => ({
  deleteItem: prodId => dispatch(removingItemsFromCart(prodId)),
  editingItemsInCart: productObj => dispatch(editingItemsInCart(productObj)),
  getSelectedProduct: prodId => {dispatch(getSelected(prodId))  },
})

export default connect(mapState, mapDispatch)(disconnectedCart)

/**
 * PROP TYPES
 */
// Cart.propTypes = {
// email: PropTypes.string
// }
