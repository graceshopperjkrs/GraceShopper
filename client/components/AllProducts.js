import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {gettingAllProducts} from './products'

/**
 * COMPONENT
 */


class AllProducts extends Component {


  componentDidMount() {
   this.props.getAllProducts()
  }

    render() { 

      const AllProducts = this.props.AllProducts

      if (!AllProducts[0]) return 'loading'

        return ( 
            <ul>
              {
                AllProducts.map(product => (
                  <li key={product.id}
                  >
                  <SingleProduct product={product}/>
                  </li>
                ))
              }
            </ul>
         );
    }
}
 
export default ;


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    AllProducts:state.AllProducts
  }
}


const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(gettingAllProducts())
  }
}


export default connect(mapState,mapDispatch)(AllProducts)

/**
 * PROP TYPES
 */
AllProducts.propTypes = {
  // email: PropTypes.string
}
