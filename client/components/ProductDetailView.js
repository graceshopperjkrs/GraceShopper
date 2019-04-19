import React, { Component } from 'react'
import { SingleProduct } from './SingleProduct'
import { connect } from 'react-redux'
import { getSelected } from '../store/product'

class productDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { addQty: 0 } // should be a better way to handle this local state
  }

  componentDidMount () {
    const id = this.props.match.params.productId
    this.props.getSelectedProduct(id)

    this.handleAddProductChange = this.handleAddProductChange.bind(this)
    this.handleAddProductSubmit = this.handleAddProductSubmit.bind(this)
  }

  handleAddProductSubmit (evt) {
    evt.preventDefault()
    // will post qty to axios and also change store
    const productObj = {
      id: this.props.match.params.productId,
      quantity: this.state.addQty
    }
    // call the cart thunk
    console.log('new qty', this.state.addQty)
  }

  handleAddProductChange (evt) {
   // console.log('prod change' , evt.target)
    // will change local state qty // not good practice to have local state ?
    this.setState({ addQty: evt.target.value })
  }

  render () {
    if (!this.props.selected) {
      return 'Loading'
    }

    return (
      <div>
        <SingleProduct
          product={this.props.selected}
          path='ProductDetailView'
          handleAddProductChange={this.handleAddProductChange}
          handleAddProductSubmit={this.handleAddProductSubmit}
        />
      </div>
    )
  }
}

const mapState = state => ({
  selected: state.SelectedProduct
})

const mapDispatch = dispatch => {
  return {
    getSelectedProduct: id => {
      dispatch(getSelected(id))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(productDetail)
