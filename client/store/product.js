import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//INITIAL STATE
const productsInitialState = {
    AllProducts: [],
    SelectedProduct: {}
}

//ACTION CREATORS
const gotAllProducts = products => ({
    type:GET_ALL_PRODUCTS,
    products
})

//THUNK
export const gettingAllProducts = () => async dispatch => {
    try {
        //TODO:double check API route
        const res = await axios.get('/api/products')
        dispatch(gotAllProducts(res.data))
    } catch (err) {
        console.error(err)
    }
}

//REDUCER
export default function(state = productsInitialState, action) {
    switch (action.type) {
      case GET_ALL_PRODUCTS:
        return {...state, AllProducts:action.products}
      default:
        return state
    }
  }



