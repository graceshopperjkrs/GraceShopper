import axios from 'axios'
import history from '../history'

//ACTION TYPES
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_SELECTED_PRODUCT = 'GET_SELECTED_PRODUCT'

//INITIAL STATE

//ACTION CREATORS
export const gotAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

export const gotSelectedProducts = product => ({
  type: GET_SELECTED_PRODUCT,
  product
})

//THUNK
export const gettingAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(gotAllProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getSelected = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(gotSelectedProducts(res.data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER
export function AllProducts(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export function SelectedProduct(state = {}, action) {
  switch (action.type) {
    case GET_SELECTED_PRODUCT:
      return action.product
    default:
      return state
  }
}
