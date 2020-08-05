import { FETCH_USER_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, CHECKOUT_CART } from "./cart.types";

const INITIAL_STATE = {
  cartItems : [],
  cartTotal : 0
}

const cartReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case FETCH_USER_CART:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal : action.payload.cartTotal
      }
    case ADD_TO_CART :
      return {
        ...state,
        cartItems : [...state.cartItems, action.payload]
      }
    case UPDATE_CART : 
      return {
        ...state,
        cartItems : action.payload.cartItems,
        cartTotal : action.payload.cartTotal
      }
    case CHECKOUT_CART :
      return {
        ...state,
        cartItems : [],
        cartTotal : 0
      }
    default:
      return state;
  }
};

export default cartReducer;