import { FETCH_USER_CART } from "./cart.types";

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
    default:
      return state;
  }
};

export default cartReducer;