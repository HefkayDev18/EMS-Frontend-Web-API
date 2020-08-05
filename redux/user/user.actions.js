import { SET_CURRENT_USER, LOG_OUT, SET_PROFILE, LOGIN_SUCCESS, LOGGING_IN, LOGIN_ERROR, GET_USER_ERROR, IS_REGISTERING, REGISTER_ERROR, REGISTER_SUCCESS, IS_UPDATING, UPDATE_ERROR, UPDATE_SUCCESS, SET_GUEST, SET_EDITING_GUEST } from './user.types';
import Cookies from 'js-cookie';
import { fetchCart } from '../cart/cart.actions';
import { API } from '../apiBase';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const getUserProfile = (id) => dispatch => {
  fetch(API(`/user/${id}`), {
    credentials : 'include'
  })
  .then(res=> res.json())
  .then(data => {
    if(!data.error) {
      if(!data.user.address) {
        data.user.address = {};
      }
      Cookies.set('OJAA_USER', data.user, { domain : 'ojaafoods.ng' });
      // Cookies.set('OJAA_USER', data.user);
      dispatch({ type : SET_PROFILE, payload : data.user})
    }
    else {
      Cookies.remove('OJAA_USER', { domain : 'ojaafoods.ng' });
      dispatch({ type : GET_USER_ERROR })
    }
  })
  .catch(err => console.log(err))
}

export const loginuser = (credentials) => dispatch => {
  dispatch({ type : LOGGING_IN })
  fetch(API('/login'), {
    method : 'POST',
    credentials : 'include',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(credentials)
  })
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      dispatch({ type : LOGIN_ERROR , payload : data.error})
    } else {
      if(!data.user.address) {
        data.user.address = {};
      }
      Cookies.set('OJAA_USER', data.user, { domain : 'ojaafoods.ng' });
      // Cookies.set('OJAA_USER', data.user );
      dispatch({ type : SET_PROFILE, payload : data.user})
      dispatch({ type : LOGIN_SUCCESS })
      dispatch(fetchCart(data.user._id));
      localStorage.removeItem('OJAA_CART');
    }
  })
  .catch(err => {
    console.log(err);
    dispatch({ type : LOGIN_ERROR , payload : 'Snap! Could not connect to server'})
  })
}

export const registerUser = (detailss) => dispatch => {
  const details ={...detailss};
  dispatch({ type : IS_REGISTERING });
  if(details.phone) {
    if(details.phone.startsWith('0')) {
      details.phone = '+234' + details.phone.substring(1);
    } else {
      details.phone = '+234' + details.phone;
    }
  } else {
    delete details.phone
  }
  fetch(API('/register'), {
    method : 'POST',
    credentials : 'include',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(details)
  })
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      dispatch({ type : REGISTER_ERROR , payload : data.error})
    } else {
      data.user.address = {};
      Cookies.set('OJAA_USER', data.user, { domain : 'ojaafoods.ng' });
      dispatch({ type : SET_PROFILE, payload : data.user})
      dispatch({ type : REGISTER_SUCCESS })
      dispatch(fetchCart(data.user._id))
    }
  })
  .catch(err => {
    console.log(err)
    dispatch({ type : REGISTER_ERROR , payload : 'Snap! Looks like you are offline'})
  })
}

export const updateUser = (data, id) => dispatch => {
  dispatch({ type : IS_UPDATING })
  fetch(API(`/user/update/${id}`), {
    method : 'PUT',
    credentials : 'include',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      dispatch({ type : UPDATE_ERROR , payload : data.error })
    } else {
      dispatch({ type : UPDATE_SUCCESS, payload : data.message });
      dispatch(setCurrentUser(data.user))
    }
  })
  .catch(err => {
    console.log(err);
    dispatch({ type : UPDATE_ERROR, payload : 'Snap! Looks like you\'re offline'});
  })
}

export const setGuest = guest => ({
  type : SET_GUEST,
  payload : guest
})

export const setEditingGuest = () => ({
  type : SET_EDITING_GUEST
});

export const logoutUser = () => dispatch => {
  Cookies.remove('OJAA_USER', { domain : 'ojaafoods.ng'});
  fetch(API('/logout'), {
    method : 'GET',
    credentials : 'include'
  });
  dispatch({type : LOG_OUT});
  dispatch(fetchCart())
}