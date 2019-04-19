import React, {Component} from 'react'
import {SingleProduct} from './SingleProduct'
import {connect} from 'react-redux'
import {getSelected} from '../store/product'
import {CartSubtotal} from './CartSubtotal'
import {addingItemstoCart} from '../store/cart'

class productDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {addQty: 0} // should be a better way to handle this local state
  }

  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSelectedProduct(id)

    this.handleAddProductChange = this.handleAddProductChange.bind(this)
    this.handleAddProductSubmit = this.handleAddProductSubmit.bind(this)
  }

  handleAddProductSubmit(evt) {
    evt.preventDefault()
    // will post qty to axios and also change store
    const productObj = {
      productId: this.props.selected.id,
      purchaseQuantity: Number(this.state.addQty),
      purchasePrice: Number(this.props.selected.price)
    }
    console.log('*****detail view', this.props.selected)
    // call the cart thunk
    console.log('new qty', this.state.addQty)
    this.props.addingItemstoCart(productObj) // double check this
  }

  handleAddProductChange(evt) {
    // console.log('prod change' , evt.target)
    // will change local state qty // not good practice to have local state ?
    this.setState({addQty: evt.target.value})
  }

  render() {
    console.log(this.props)
    if (!this.props.selected) {
      return 'Loading'
    }

    return (
      <div className="RowContainer">
        <div className="ColumnContainer">
          <SingleProduct
            product={this.props.selected}
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

const mapState = state => ({
  selected: state.SelectedProduct
})

const mapDispatch = dispatch => ({
  getSelectedProduct: id => {
    dispatch(getSelected(id))
  },
  addingItemstoCart: productObj => {
    dispatch(addingItemstoCart(productObj))
  }
})

export default connect(mapState, mapDispatch)(productDetail)
