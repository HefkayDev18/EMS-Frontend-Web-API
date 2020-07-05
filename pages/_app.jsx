import '../styles/styles.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Provider } from 'react-redux'
import store from '../redux/store';
import { setCurrentUser, getUserProfile } from '../redux/user/user.actions';
import { fetchCart } from '../redux/cart/cart.actions';
import Head from 'next/head'

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
      <Head>
        <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon"/>
        <meta name="description" content="Buy foodstufss online"/>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}