import axios from 'axios'
import history from '../history'

//INITIAL STATE
const initialState = {
  cart: [], // cart will contain {items, qty, price}
  totalItems: 0,
  totalPrice: 0
}

// ACTION TYPES
export const INITIAL_CART = 'INITIAL_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const EDIT_QTY_FROM_CART = 'EDIT_QTY_FROM_CART'
export const GET_CART = 'GET_CART'

//ACTION CREATOR
export const initialCart = () => ({
  type: INITIAL_CART,
  cart: initialState.cart
})

export const addItemstoCart = item => ({
  type: ADD_TO_CART,
  item
})
export const removeItemsfromCart = id => ({
  type: REMOVE_FROM_CART,
  id
})
export const editQtyfromCart = item => ({
  type: EDIT_QTY_FROM_CART,
  item
})
export const getCart = () => ({
  type: GET_CART
})

// CALCULATE TOTAL PRICE
function totalCalculation(cart) {
  console.log('checking cart', cart)
  let sum = cart.reduce((accm, item) => {
    return (accm += Number(item.purchaseQuantity) * Number(item.purchasePrice))
  }, 0)
  console.log('checking sum', sum)
  return sum
}
//THUNKS

export const initialCartorder = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(initialCart(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const addingItemstoCart = item => async dispatch => {
  try {
    console.log('checking item', item)
    const res = await axios.post('/api/cart', item)
    console.log('checking res', res)
    dispatch(addItemstoCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const removingItemsFromCart = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/cart'/${id}`)
    dispatch(removeItemsfromCart(id))
  } catch (err) {
    console.error(err)
  }
}

export const editingItemsInCart = item => async dispatch => {
  try {
    const res = await axios.put(`/api/cart'/${item.id}`, item)
    const editedItem = res.data

    dispatch(editQtyfromCart(editedItem))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export function AddItems(state = initialState, action) {
  switch (action.type) {
    case INITIAL_CART:
      return {
        ...state,
        cart: action.cart,
        totalPrice: totalCalculation(action.cart),
        totalItems: action.cart.length
      }

    case ADD_TO_CART:
      const newCart = [...state.cart, action.item]
      const subtotal = totalCalculation(newCart)
      return {
        ...state,
        cart: newCart,
        totalPrice: subtotal,
        totalItems: newCart.length
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [...state.cart].filter(item => action.id !== item.id),
        totalPrice: totalCalculation(action.cart),
        totalItems: action.cart.length
      }

    case EDIT_QTY_FROM_CART:
      return {
        ...state,
        cart: [...state, action.cart],
        totalPrice: totalCalculation(action.cart),
        totalItems: action.cart.length
      }

    case GET_CART:
      return {
        ...state,
        cart: state.cart
      }

    default:
      return state
  }
}
