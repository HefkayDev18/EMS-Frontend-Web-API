import { SET_CURRENT_USER, LOG_OUT, SET_PROFILE } from './user.types';

const INITIAL_STATE = {
  user: null
}

const userReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_PROFILE : 
      return {
        ...state,
        user : action.payload
      }
    case LOG_OUT : 
      return {
        ...state,
        user : null
      }
    default:
      return state;
  }
};

export default userReducer;