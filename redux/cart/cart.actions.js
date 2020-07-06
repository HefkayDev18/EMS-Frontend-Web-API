import { FETCH_USER_CART } from "./cart.types"
import { API } from "../apiBase"

export const fetchCart = (id) => dispatch => {
  fetch(API(`/cart/${id}`), {
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