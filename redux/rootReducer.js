import { combineReducers } from 'redux';

import userReducer from './user/user.reducers';
import cartReducer from './cart/cart.reducers';

export default combineReducers({
  user: userReducer,
  cart : cartReducer
});