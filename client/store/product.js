import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SELECTED_PRODUCT = 'GET_SELECTED_PRODUCT'

//INITIAL STATE
const productsInitialState = {
  AllProducts: [],
  SelectedProduct: {}
}

//ACTION CREATORS
const gotAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const gotSelectedProducts = product => ({
  type: GET_SELECTED_PRODUCT,
  product
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

export const getSelected = productId => async dispatch => {
  try {
    //TODO: double check API route
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(gotSelectedProducts(res.data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER
export default function(state = productsInitialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, AllProducts: action.products}
    case GET_SELECTED_PRODUCT: {
      return {...state, SelectedProduct: action.product}
    }
    default:
      return state
  }
}
