import '../styles/styles.css'
import 'react-toastify/dist/ReactToastify.css';
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
        <title>Ojaafoods Nigeria</title>
        <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon"/>
        <meta name="description" content="Ojaafoods Nigeria is a digital market platform developed to eliminate the rigours of shopping at local markets by providing increased access to varieties of fresh and affordable foodstuff, frozen foods, groceries, spices at the tap of a button."/>
        <meta property="og:title" content="Ojaafoods Nigeria" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dev.ojaafoods.ng/images/logo.png" />
        <meta property="og:description" content="Ojaafoods Nigeria is a digital market platform developed to eliminate the rigours of shopping at local markets by providing increased access to varieties of fresh and affordable foodstuff, frozen foods, groceries, spices at the tap of a button."/>
        <meta name="keywords" content="Ojaa foodstuff rice beans garri lagos yummy delicious oil fish fruits grains vegetable spices protein food ojaafoods oja market foods sweet"/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:type" content="website" />
        <meta name="twitter:site" content="@ojaafoods" />
        <meta name="twitter:creator" content="@ojaafoods" />
        <meta name="twitter:title" content="Ojaafoods Nigeria" />
        <meta name="twitter:description" content="Ojaafoods Nigeria is a digital market platform developed to eliminate the rigours of shopping at local markets by providing increased access to varieties of fresh and affordable foodstuff, frozen foods, groceries, spices at the tap of a button." />
        <meta name="twitter:image" content="https://dev.ojaafoods.ng/images/logo.png" />
        <link rel="preload" href="/icons/user-round.svg"/>
        <link rel="preload" href="/icons/logout.svg"/>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}