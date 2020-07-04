import '../styles/styles.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Provider } from 'react-redux'
import store from '../redux/store';
import { setCurrentUser, getUserProfile } from '../redux/user/user.actions';
import { fetchCart } from '../redux/cart/cart.actions';

export default function App({ Component, pageProps }) {
  useEffect(()=> {
    const user = Cookies.get('OJAA_USER') ?  JSON.parse(Cookies.get('OJAA_USER')) : null;
    store.dispatch(setCurrentUser(user));
    if(user) {
      store.dispatch(getUserProfile(user.id))
      store.dispatch(fetchCart(user.id))
    }
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}