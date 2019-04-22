import axios from 'axios'
import history from '../history'

//INITIAL STATE
const initialState = {
  cart: [], // cart will contain {items, qty, price} // does not includ imageUrl
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
export const getCart = item => ({
  type: GET_CART,
  item
})

// CALCULATE TOTAL PRICE
function totalCalculation(cart) {
  let sum = cart.reduce((accm, item) => {
    return (accm += Number(item.qty) * Number(item.price))
  }, 0)

  return sum
}
//THUNKS

export const gettingCartDetails = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const addingItemstoCart = item => async dispatch => {
  try {
    //console.log('checking item', item)
    const res = await axios.post('/api/cart', item)
    let newItem = res.data
    newItem['imageUrl'] = item.imageUrl
    newItem['name'] = item.name
    dispatch(addItemstoCart(newItem))
  } catch (err) {
    console.error(err)
  }
}

export const removingItemsFromCart = id => async dispatch => {
  try {
    console.log('delete thunk id:', id)
    const res = await axios.delete(`/api/cart/${id}`)
    console.log('delete thunk', id)
    dispatch(removeItemsfromCart(id))
  } catch (err) {
    console.error(err)
  }
}

export const editingItemsInCart = item => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/${item.id}`, item)
    dispatch(editQtyfromCart(item))
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
      console.log('reducer remove ', state.cart[0])

      let cartWithoutItem = [...state.cart].filter(
        item => action.id !== item.productId
      )
      return {
        ...state,
        cart: cartWithoutItem,
        totalPrice: totalCalculation(cartWithoutItem),
        totalItems: cartWithoutItem.length
      }

    case EDIT_QTY_FROM_CART:
      let cartItem = state.cart.filter(el => el.id === action.id)[0]

      cartItem = {...cartItem, purchaseQuantity: action.item.purchaseQuantity}
      let restOfCart = state.cart.filter(el => el.id !== action.id)
      let editedCart = [...restOfCart, cartItem]

      let editedSubTotal = totalCalculation(editedCart)
      return {
        ...state,
        cart: editedCart,
        totalPrice: editedSubTotal,
        totalItems: editedCart.length
      }

    case GET_CART:
      return {
        ...state,
        cart: action.item
      }

    default:
      return state
  }
}
