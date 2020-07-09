import { combineReducers } from 'redux';

import userReducer from './user/user.reducers';
import cartReducer from './cart/cart.reducers';
import productReducer from './products/products.reducers';

export default combineReducers({
  user: userReducer,
  cart : cartReducer,
  products : productReducer
});