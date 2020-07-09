import { SET_CURRENT_USER, LOG_OUT, SET_PROFILE, LOGGING_IN, LOGIN_ERROR, LOGIN_SUCCESS, GET_USER_ERROR, IS_REGISTERING, REGISTER_ERROR, REGISTER_SUCCESS, IS_UPDATING, UPDATE_SUCCESS, UPDATE_ERROR } from './user.types';

const INITIAL_STATE = {
  user: null,
  isLoggedIn : false,
  login_error : '',
  logging_in : false,
  isRegistering : false,
  registerError : '',
  registerSuccess : false,
  isCheckingAuth : true,
  isUpdating : false,
  updateError : '',
  updateSuccess : ''
}

const userReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        isCheckingAuth : false,
        user: action.payload,
        isLoggedIn : action.payload ? true : false
      }
    case SET_PROFILE : 
      return {
        ...state,
        user : action.payload
      }
    case GET_USER_ERROR : 
      return {
        ...state,
        user : null,
        isLoggedIn : false
      }
    case LOG_OUT : 
      return {
        ...state,
        user : null,
        isLoggedIn : false
      }
    case LOGGING_IN : 
      return {
        ...state,
        logging_in : true
      }
    case LOGIN_ERROR :
      return {
        ...state,
        login_error : action.payload,
        logging_in : false
      }
    case LOGIN_SUCCESS : 
      return {
        ...state,
        isLoggedIn : true,
        logging_in : false,
        login_error : ''
      }
    case IS_REGISTERING : 
      return {
        ...state,
        isRegistering : true
      }
    case REGISTER_ERROR : 
      return {
        ...state,
        isRegistering : false,
        registerError : action.payload
      }
    case REGISTER_SUCCESS :
      return {
        ...state,
        registerSuccess : true,
        isRegistering : false,
        registerError : '',
        isLoggedIn : true
      }
    case IS_UPDATING : 
      return {
        ...state,
        isUpdating : true
      }
    case UPDATE_ERROR :
      return {
        ...state,
        isUpdating : false,
        updateError : action.payload
      }
    case UPDATE_SUCCESS :
      return {
        ...state,
        updateError : '',
        isUpdating : false,
        updateSuccess : action.payload
      }
    default:
      return state;
  }
};

export default userReducer;