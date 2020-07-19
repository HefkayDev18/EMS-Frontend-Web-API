import Cookies from 'js-cookie'

const calcCartTotal = (cart) => {
  return cart.cartItems.reduce((a, c) => a + (c.quantity * c.product.price) , 0)
}

const addToOfflineCart = (item) => {
  const cart = Cookies.getJSON('OJAA_CART');
  console.log(cart)
  if(!cart) {
    const newCart = {
      cartItems : [item],
      cartTotal : item.product.price * item.quantity
    };
    Cookies.set('OJAA_CART', newCart, { expires : 15 });
    return newCart;
  }
  //check if product is already in cart
  const inCartIndex = cart.cartItems.findIndex(c => c.product._id === item.product._id);
  if(inCartIndex < 0) {
    cart.cartItems.push(item);
  } else {
    cart.cartItems[inCartIndex] = item;
  }
  cart.cartTotal = calcCartTotal(cart);
  Cookies.set('OJAA_CART', cart, { expires : 15 });
  return cart;
}

const updateOfflineCart = (data) => {
  const cart = Cookies.getJSON('OJAA_CART');
  if(!cart) return {
    cartItems : [],
    cartTotal : 0
  };
  const productIndex = cart.cartItems.findIndex(c => c.product._id === data.product);
  if(productIndex < 0) return cart;
  cart.cartItems[productIndex].quantity = data.quantity;
  cart.cartTotal = calcCartTotal(cart);
  Cookies.set('OJAA_CART', cart, { expires : 15 });
  return cart;
}

const removeProductOfflineCart = (product) => {
  const cart = Cookies.getJSON('OJAA_CART');
  if(!cart) return {
    cartItems : [],
    cartTotal : 0
  }
  const productIndex = cart.cartItems.findIndex(c => c.product._id === product);
  if(productIndex < 0) return cart;
  cart.cartItems.splice(productIndex, 1);
  cart.cartTotal = calcCartTotal(cart);
  Cookies.set('OJAA_CART', cart, { expires : 15 });
  return cart;
}

export { addToOfflineCart, updateOfflineCart, removeProductOfflineCart };