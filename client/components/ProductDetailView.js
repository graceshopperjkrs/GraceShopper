import React, {Component} from 'react'
import SingleProduct from './SingleProduct'
import {connect} from 'react-redux'
import {getSelected} from '../store/product'
import CartSubtotal from './CartSubtotal'
import {gettingCartDetails} from '../store/cart'

class productDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {changeQty: false}
    this.singleProductChanged = this.singleProductChanged.bind(this)
    // this.handleAddProductChange = this.handleAddProductChange.bind(this)
    // this.handleAddorModifyProductSubmit = this.handleAddorModifyProductSubmit.bind(this)
  }

  componentDidMount() {
    // //console.log('product details has mounted, [props.addQty', this.props.addQty)
    /// /console.log('product details state.addQty', this.state.addQty)
    const id = this.props.match.params.productId
    this.props.getSelectedProduct(id)
    // this.props.getCart()
  }

  singleProductChanged() {
    this.setState({changeQty: !this.state.changeQty})
    this.props.getCart()
  }

  render() {
    if (!this.props.selected) {
      return 'Loading'
    }

    return (
      <div className="RowContainer">
        <div className="ColumnContainer">
          <ul>
            <li>
              <SingleProduct
                product={{
                  ...this.props.selected,
                  productId: this.props.selected.id
                }}
                path="ProductDetailView"
                singleProductChanged={this.singleProductChanged}
              />
            </li>
          </ul>
        </div>
        <CartSubtotal path="ProductDetailView" />
      </div>
    )
  }
}

const mapState = state => {
  return {
    selected: state.SelectedProduct,
    cartList: state.AddItems.cart
  }
}

const mapDispatch = dispatch => ({
  getSelectedProduct: id => {
    dispatch(getSelected(id))
  },
  getCart: () => dispatch(gettingCartDetails)
})

export default connect(mapState, mapDispatch)(productDetail)
