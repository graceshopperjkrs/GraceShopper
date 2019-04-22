import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SingleProduct} from './SingleProduct'
import CartSubtotal from './CartSubtotal'
import {gettingAllProducts} from '../store/product'

/**
 * COMPONENT
 */

export class AllProducts extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.getAllProducts()
   
  }

  render() {
    const allProducts = this.props.AllProducts

    if (!allProducts) return 'loading'
    // console.log(allProducts[0])
    return (
      <div className="RowContainer">
        <div className="ColumnContainer">
      <ul>
        {allProducts.map(product => (
          <li key={product.id}>
            <SingleProduct product={product} path='AllProducts' />
          </li>
        ))}
      </ul>
      </div>
          <CartSubtotal path='AllProducts'/>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    AllProducts: state.AllProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(gettingAllProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

/**
 * PROP TYPES
 */
AllProducts.propTypes = {
  // email: PropTypes.string
}
