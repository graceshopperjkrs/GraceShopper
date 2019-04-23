import React, { Component } from 'react'
import { SingleProduct } from './SingleProduct'
import { connect } from 'react-redux'
import { getSelected } from '../store/product'
import CartSubtotal from './CartSubtotal'
import { addingItemstoCart, editingItemsInCart, gettingCartDetails } from '../store/cart'

class productDetail extends Component {
  constructor (props) {
    super(props)
   
    this.state = {addQty: this.props.addQty || 0 }
    this.handleAddProductChange = this.handleAddProductChange.bind(this)
    //this.handleAddorModifyProductSubmit = this.handleAddorModifyProductSubmit.bind(this)
  }

  componentDidMount () {
   // console.log('product details has mounted, [props.addQty', this.props.addQty)
    //console.log('product details state.addQty', this.state.addQty)
    const id = this.props.match.params.productId
    this.props.getSelectedProduct(id)
    this.props.getCart()
  }

  handleAddProductChange (evt, id) {
    evt.preventDefault()
    console.log('handle add product submit', this.props.addQty, evt.target.value )

    if (this.props.addQty === 0) {
      console.log('detail page:  ad qty ', this.props , this.props.addQty , evt.target.value)
      let productObj = {
        productId: id ,//this.props.selected.id,
        qty: Number(evt.target.value),
        price: Number(this.props.selected.price),
        imageUrl: this.props.selected.imageUrl,
        name: this.props.selected.name
      }
      this.props.addingItemstoCart(productObj)
    } else {
      console.log('detail page: dit qty', this.props)
      let productObj = {
        id: this.props.selected.id,
        qty: Number(evt.target.value)
      }
      this.props.editingItemsInCart(productObj)
    }
    this.props.getCart()
  }

  // handleAddProductChange (evt) {
  //   console.log('changing amount: ', this.state.addQty)
  //   console.log('... to', evt.target.value)
  //   // react batches the setState SO THIS DOESN"T HAPPEN RIGHT NOW
  //   this.setState({addQty: evt.target.value})
  //   // react batches the setState 
  //   console.log('addQty is now', this.state.addQty)
  //   // so this isn't updated here and the re-render doesn't put the new state in.
    
  // }

  render () {
     console.log(this.props)
    if (!this.props.selected) {
      return 'Loading'
    }
    console.log('render single ', this.props.addQty)
    return (
      <div className='RowContainer'>
        <div className='ColumnContainer'>
          <ul>
            <li>
              <SingleProduct
                product={{...this.props.selected, 
                  qty: this.props.addQty, 
                  productId: this.props.selected.id}}
             
                path='ProductDetailView'
                handleAddProductChange={this.handleAddProductChange}
                //handleAddProductSubmit={this.handleAddorModifyProductSubmit}
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
  console.log('Detail mapstate cart: ', state.AddItems.cart)
  console.log('detail seleected prod', state.SelectedProduct)
  console.log(state.AddItems.cart.filter( item => {
  return (item.productId ===state.SelectedProduct.id)}))

  const qtyInCart = state.AddItems.cart.reduce( (currentValue, item) => {
    if (item.productId === state.SelectedProduct.id) {
      return   currentValue + item.qty
    } else {
      return currentValue
    }
  }, 0)

  console.log('reduce', qtyInCart  )
  return {
    selected: state.SelectedProduct,
    addQty: qtyInCart
  }
}

const mapDispatch = dispatch => ({
  getSelectedProduct: id => {
    dispatch(getSelected(id))
  },
  addingItemstoCart: productObj => {
    dispatch(addingItemstoCart(productObj))
  },
  editingItemsInCart: productObj => dispatch(editingItemsInCart(productObj)),
  getCart: ()=> dispatch(gettingCartDetails())
})

export default connect(
  mapState,
  mapDispatch
)(productDetail)
