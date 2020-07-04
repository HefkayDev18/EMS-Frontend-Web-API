import { FETCH_USER_CART } from "./cart.types"

export const fetchCart = (id) => dispatch => {
  fetch(`http://127.0.0.1:3001/cart/${id}`, {
    credentials : 'include'
  })
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      console.log(data.error)
    }
    else {
      dispatch({ type : FETCH_USER_CART, payload : data.cart })
    }
  })
}