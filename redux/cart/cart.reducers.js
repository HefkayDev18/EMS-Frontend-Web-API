import { FETCH_USER_CART } from "./cart.types";

const INITIAL_STATE = {
  cartItems : [,2,3,4,5,6,7,8,9,10],
  cartTotal : 10
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