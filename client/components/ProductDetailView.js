import React, {Component} from 'react'
import {SingleProduct} from './SingleProduct'
import {connect} from 'react-redux'
import {getSelected} from '../store/product'

class productDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSelected(id)
  }

  render() {
    if (!this.props.selected.id) {
      return 'Loading'
    }

    return (
      <div>
        <SingleProduct product={this.props.selected} />
        Description:
        {this.props.selected.description}
      </div>
    )
  }
}

const mapState = state => ({
  selected: state.products.selected
})

const mapDispatch = dispatch => {
  return {
    getSelectedProduct: id => {
      dispatch(getSelected(id))
    }
  }
}

export default connect(mapState, mapDispatch)(productDetail)
