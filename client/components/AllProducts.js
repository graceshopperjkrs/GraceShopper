import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {gettingAllProducts} from '../store/product'

/**
 * COMPONENT
 */

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProducts()
    console.log(this.props.AllProducts)
  }

  render() {
    const AllProducts = this.props.AllProducts

    if (!AllProducts) return 'loading'
    console.log(AllProducts[0])
    return (
      <ul>
        {AllProducts.map(product => (
          <li key={product.id}>
            <SingleProduct product={product} />
          </li>
        ))}
      </ul>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    AllProducts: state.products.AllProducts
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
