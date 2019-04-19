import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SingleProduct} from './SingleProduct'
import {gettingAllProducts} from '../store/product'

/**
 * COMPONENT
 */

export class Cart extends Component {
  constructor(props) {
     super(props)
     this.handleEditCartChange = this.handleEditCartChange.bind(this)
   //  this.handleEditCartSubmit = this.handleEditCartSubmit.bind(this)
   }

  componentDidMount() {
    //this.props.getCart()
    console.log(this.props.cartList)
  }


  handleEditCartChange(evt,id){
    console.log('change', evt.target.value )
      
      console.log('cart Change Event id: ', id)
  }

  render() {
    //const cartList = this.props.cartList
    const cartList = [{name: 'name', imageUrl:'http://dummyimage.com/192x121.jpg/5fa2dd/ffffff' , price:2, qty: 10, id:1} ]
   // console.log('cart props', this.props)
    if (!cartList) return 'Cart is Still Empty.  Please add items' // or cart is empty
    
    return (
        <div className="Container">
      <ul>
        {cartList.map(product => (
          <li key={product.id}>
            <SingleProduct product={product} 
                            path='Cart' 
                            handleEditCartChange={this.handleEditCartChange} 
                            handleEditCartSubmit={this.handleEditCartSubmit}
                            deleteItem={this.props.deleteItem} />
          </li>
        ))}
      </ul>
      </div>
      
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cartList: state.cart.cart 
  }
}

const mapDispatch = dispatch => ({
    deleteItem: prodId=> dispatch(removeItemFromCart(prodId))
  
})

export default connect(mapState, mapDispatch)(Cart)

/**
 * PROP TYPES
 */
Cart.propTypes = {
  // email: PropTypes.string
}
