import { FETCH_USER_CART, UPDATE_CART, CHECKOUT_CART } from "./cart.types"
import { API } from "../apiBase"
import { addToOfflineCart, updateOfflineCart, removeProductOfflineCart } from "./offlineCart"

export const fetchCart = (id) => dispatch => {
  if(!id) {
    let cart = localStorage.getItem('OJAA_CART');
    if(!cart){
      const newCart = {
        cartItems : [],
        cartTotal : 0
      };
      localStorage.setItem('OJAA_CART', JSON.stringify(newCart));
      dispatch({ type : FETCH_USER_CART, payload : newCart });
      return;
    }
    dispatch({ type : FETCH_USER_CART, payload : JSON.parse(cart) });
    return;
  }
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

export const addToCart = (data) => (dispatch, getState) => {
  const user = getState().user.user;
  if(user) {
    //Logged in user cart
    fetch(API('/cart'), {
      method : 'POST',
      credentials : 'include',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({ user : user._id ,quantity : data.quantity, product : data.product._id})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        console.error(data.error);
      } else {
        dispatch({ type : UPDATE_CART, payload : data.newCart })
      }
    })
  } else {
    //not logged in user cart
    const newCart = addToOfflineCart(data);
    dispatch({ type : UPDATE_CART, payload : newCart })
  }
}

export const updateQuantity = (data) => (dispatch, getState) => {
  const user = getState().user.user;
  if(user) {
    fetch(API('/cart'), {
      method : 'PUT',
      credentials : 'include',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({ user : user._id ,quantity : data.quantity, product : data.product})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        return;
      } else {
        dispatch({ type : UPDATE_CART, payload : data.newCart })
      }
    })
  } else {
    const newCart = updateOfflineCart(data);
    dispatch({ type : UPDATE_CART, payload : newCart });
  }
}

export const removeProduct = (product) => (dispatch, getState) => {
  const user = getState().user.user;
  if(user) {
    fetch(API('/cart/remove'), {
      method : 'PUT',
      credentials : 'include',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({ user : user._id , product})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        return;
      } else {
        dispatch({ type : UPDATE_CART, payload : data.newCart })
      }
    })
  } else {
    const newCart = removeProductOfflineCart(product);
    dispatch({ type : UPDATE_CART, payload : newCart })
  }
}


export const checkoutCart = () => (dispatch) => {
  if(localStorage.getItem('OJAA_CART')) {
    localStorage.removeItem('OJAA_CART');
  }
  dispatch({ type : CHECKOUT_CART })
}