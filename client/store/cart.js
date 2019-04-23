import axios from 'axios'
import history from '../history'

//INITIAL STATE
const initialState = {
  cart: [], // cart will contain {productId, items, qty, price, imageUrl} 
  // totalItems: 0,
  // totalPrice: 0
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
    return (accm + Number(item.qty) * Number(item.price))
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
    
    console.log('adding items to cart', item)
  
    const {data} = await axios.post('/api/cart', item)
  
    // let newItem = res.data
    // newItem['imageUrl'] = item.imageUrl
    // newItem['name'] = item.name
    dispatch(addItemstoCart(item))
  } catch (err) {
    console.error(err)
  }
}

export const removingItemsFromCart = id => async dispatch => {
  try {

    await axios.delete(`/api/cart/${id}`)

    dispatch(removeItemsfromCart(id))
  } catch (err) {
    console.error(err)
  }
}

export const editingItemsInCart = item => async dispatch => {
  try {
    console.log('editing item thunk ', item)
    await axios.put(`/api/cart/${item.id}`, item)
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
  
      }

    case ADD_TO_CART:
      
      return {
        ...state,
        cart:  [...state.cart, action.item]
      }

    case REMOVE_FROM_CART:

      return {
        ...state,
        cart: [...state.cart].filter(
          item => action.id !== item.productId
        ),
        
      }

    case EDIT_QTY_FROM_CART:
      // let cartItem = state.cart.filter(el => el.id === action.id)[0]

      // cartItem = {...cartItem, qty: action.item.purchaseQuantity}
      // console.log('------------start length of cart', state.cart.length)
      // let restOfCart = state.cart.filter(el => el.productId !== action.id)
      // console.log('rest of cart length',restOfCart.length)
      // console.log('rest of cart', restOfCart)
      
      // eslint-disable-next-line no-case-declarations
      const newCart = state.cart.map(  el => {
        if (el.productId=== action.id) {
          el.qty = action.qty
        }
          return el
        
      })
     
      return {
        ...state,
        cart: newCart,
    
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
