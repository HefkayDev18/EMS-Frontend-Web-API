import { SET_CURRENT_USER, LOG_OUT, SET_PROFILE } from './user.types';
import Cookies from 'js-cookie';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const getUserProfile = (id) => dispatch => {
  fetch(`http://127.0.0.1:3001/user/${id}`, {
    credentials : 'include'
  })
  .then(res=> res.json())
  .then(data => dispatch({ type : SET_PROFILE, payload : data.user}))
  .catch(err => console.log(err))
}

export const logoutUser = () => dispatch => {
  Cookies.remove('OJAA_USER');
  dispatch({type : LOG_OUT});
}