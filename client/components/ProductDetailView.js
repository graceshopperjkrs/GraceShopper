import React, { Component } from 'react'
import { SingleProduct } from './SingleProduct'
import { connect } from 'react-redux'
import { getSelected } from '../store/product'
import CartSubtotal from './CartSubtotal'
import { addingItemstoCart, editingItemsInCart } from '../store/cart'

class productDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {addQty: props.addQty || 0 }
    this.handleAddProductChange = this.handleAddProductChange.bind(this)
    this.handleAddProductSubmit = this.handleAddProductSubmit.bind(this)
  }

  componentDidMount () {
    const id = this.props.match.params.productId
    this.props.getSelectedProduct(id)
  }

  handleAddProductSubmit (evt) {
    evt.preventDefault()

    // let cartItem = this.props.cart.filter(
    //   el => el.productId === this.props.selected.id
    // )
    //console.log('addqty', this.props.addQty, evt.target.value )

    if (this.props.addQty === 0) {
      console.log('detail page:  ad qty ', this.props , this.props.addQty , this.state.addQty)
      let productObj = {
        productId: this.props.selected.id,
        qty: Number(this.state.addQty),
        price: Number(this.props.selected.price),
        imageUrl: this.props.selected.imageUrl,
        name: this.props.selected.name
      }
      this.props.addingItemstoCart(productObj)
    } else {
      console.log('detail page: dit qty', this.props)
      let productObj = {
        id: this.props.selected.id,
        qty: Number(this.state.addQty)
      }
      this.props.editingItemsInCart(productObj)
    }
  }

  handleAddProductChange (evt) {
    this.setState({ addQty: evt.target.value })
  }

  render () {
    // console.log(this.props)
    if (!this.props.selected) {
      return 'Loading'
    }

    return (
      <div className='RowContainer'>
        <div className='ColumnContainer'>
          <ul>
            <li>
              <SingleProduct
                product={{...this.props.selected, 
                  qty: this.state.addQty, 
                  productId: this.props.selected.id}}
             
                path='ProductDetailView'
                handleAddProductChange={this.handleAddProductChange}
                handleAddProductSubmit={this.handleAddProductSubmit}
              />
            </li>
          </ul>
        </div>
        <div>
          <CartSubtotal path='AllProducts' />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  // console.log('detail mapstate', state.AddItems.cart.reduce(function (currentValue, item) {
  //   if (item.productId === state.SelectedProduct.id) {
  //     return currentValue + item.qty
  //   } else {
  //     return currentValue
  //   }
  // }, 0) || 0)
  return {
    selected: state.SelectedProduct,
    // cart: ( state.AddItems.cart.filter(el=> el.productId === state.SelectedProduct.id) || 0 )
    addQty: state.AddItems.cart.reduce(function (currentValue, item) {
      if (item.productId === state.SelectedProduct.id) {
        return currentValue + item.qty
      } else {
        return currentValue
      }
    }, 0) || 0 
  }
}

const mapDispatch = dispatch => ({
  getSelectedProduct: id => {
    dispatch(getSelected(id))
  },
  addingItemstoCart: productObj => {
    dispatch(addingItemstoCart(productObj))
  },
  editingItemsInCart: productObj => dispatch(editingItemsInCart(productObj))
})

export default connect(
  mapState,
  mapDispatch
)(productDetail)
