import React, {Component} from 'react'
import {SingleProduct} from './SingleProduct'
import {connect} from 'react-redux'
import {getSelected} from '../store/product'
import CartSubtotal from './CartSubtotal'
import {addingItemstoCart, editingItemsInCart} from '../store/cart'

class productDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {addQty: 0 } 
    this.handleAddProductChange = this.handleAddProductChange.bind(this)
    this.handleAddProductSubmit = this.handleAddProductSubmit.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSelectedProduct(id)


  }

  handleAddProductSubmit(evt) {
    evt.preventDefault()

    let cartItem =  this.props.cart.filter( el=> el.productId=== this.props.selected.id) 


    if (cartItem.length === 0) {
      let productObj = { 
        productId: this.props.selected.id,
        purchaseQuantity: Number(this.state.addQty),
        purchasePrice: Number(this.props.selected.price),
        imageUrl: this.props.selected.imageUrl,
        name: this.props.selected.name 
      }
      this.props.addingItemstoCart(productObj) // double check this
    } else  {
   
      let productObj = {id:  this.props.selected.id, 
                        purchaseQuantity: Number(this.state.addQty),
                       // imageUrl: this.props.selected.imageUrl,
                       // name: this.props.selected.name
                       }
      this.props.editingItemsInCart(productObj)
    }
  }

  handleAddProductChange(evt) {

    this.setState({addQty: evt.target.value})
  }

  render() {
   // console.log(this.props)
    if (!this.props.selected) {
      return 'Loading'
    }

    return (
      <div className="RowContainer">
        <div className="ColumnContainer">
          <SingleProduct
            product={this.props.selected}
            qty={this.state.addQty}
            path="ProductDetailView"
            handleAddProductChange={this.handleAddProductChange}
            handleAddProductSubmit={this.handleAddProductSubmit}
          />
        </div>

        <div>
          <CartSubtotal path="AllProducts" />
        </div>
      </div>
    )
  }
}

const mapState = state => {

  return {
  selected: state.SelectedProduct,
  cart: state.AddItems.cart 
} }

const mapDispatch = dispatch => ({
  getSelectedProduct: id => {
    dispatch(getSelected(id))
  },
  addingItemstoCart: productObj => {
    dispatch(addingItemstoCart(productObj))
  },
  editingItemsInCart: productObj => dispatch(editingItemsInCart(productObj))
})

export default connect(mapState, mapDispatch)(productDetail)
