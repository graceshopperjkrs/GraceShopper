import React from 'react'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
import {
  editingItemsInCart,
  addingItemstoCart,
  gettingCartDetails,
  removeItemsfromCart
} from '../store/cart'

/**
 * COMPONENT
 */

class disconnectedSingleProduct extends React.Component  {
  constructor(props) {
    super(props)
    this.state={newQty: this.props.qtyInCart }
    this.handleEditCartChange = this.handleEditCartChange.bind(this)
  }

 

  handleEditCartChange (evt) {
    console.log('changing/addinng quantity in Single Product', evt.target )
    const {name, imageUrl, productId, description, price} = this.props.product
    let prodObj;
    if(this.props.qtyInCart === 0 ){
      prodObj = {
        productId,
        qty: Number(evt.target.value),
        price,
        imageUrl,
        description,
        name
      }
      this.props.addingItemstoCart(prodObj)
    } else {
       prodObj = { id: Number(productId), qty: Number(evt.target.value) }

       this.setState({ newQty: Number(evt.target.value) })

      this.props.editingItemsInCart(prodObj)
   
    }
    this.props.fetchItems()
  }


  render() {
    const {name, imageUrl, productId, description, price} = this.props.product
    console.log('Single product shows qty', this.props.qtyInCart, this.state.newQty )
  return (
    <div className="SingleProductBox">
      <Link to={`/products/${productId}`}>
        <h1>{name}</h1>
        <img className="beanImage" src={imageUrl} />
      </Link>
      <h3>Price: ${price/100.}</h3>

      {this.props.path === 'Cart' ? '' : <p>Description: {description} </p>}

      {this.props.path !== 'AllProducts' ? (
        <div>
          <h3> Current Amount: {this.props.qtyInCart}</h3>
          Edit Quantity:
          <input
            type="Number"
            name="qty"
            value={this.state.newQty}
            min="0"
            step="5"
            onChange={
             
                (evt)=>  {
                  this.handleEditCartChange(evt)
                  this.props.singleProductChanged()
            }}
          />
        </div>
      ) : (
        ''
      )}



      {this.props.path === 'Cart' ? (
        <div>
          <div className="CartActionsBox">
            <i
              className="fas fa-trash"
              onClick={() => this.props.deleteItem(productId)}
            />{' '}
            Remove Item
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
}

const mapState = (state,ownProps) =>{
  console.log('single product ownProps:   ', ownProps)

  const qtyInCart = state.AddItems.cart.reduce( (accum,el)=> {
    if (el.productId===ownProps.product.productId) {
      return el.qty
    } else {
      return accum
    }
  },0) || 0

  return {qtyInCart}

}

const mapDispatch= dispatch => ({
  addingItemstoCart: productObj => dispatch (
    addingItemstoCart(productObj)
  ),
  editingItemsInCart: productObj => dispatch(editingItemsInCart(productObj)),
  fetchItems: ()=> dispatch(gettingCartDetails),
  deleteItem: (id)=> dispatch(removeItemsfromCart(id))
})

const SingleProduct = connect(mapState, mapDispatch)(disconnectedSingleProduct)

export default SingleProduct
