import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import NavDrop from './NavDrop';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { logoutUser } from '../redux/user/user.actions';
import { setSearchText } from '../redux/products/products.actions';

export default () => {
  const router = useRouter();
  const home = router.pathname === '/';
  const isProfilePage = router.pathname.startsWith('/customer/profile');
  const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.cart);
  const [showDrop, setShowDrop] = useState(false);
  const toggleDrop = e => {
    e.preventDefault();
    setShowDrop(!showDrop);
  }
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    Router.push('/');
  };
  const handleText = e => dispatch(setSearchText(e.target.value.trim()))
  return (
    <>
    <nav className='nav flex-align'>
      <Link href='/'><img className='logo' src="/images/logo.png" alt="Ojaa Logo"/></Link>
      { home && <form onSubmit={e => e.preventDefault()} className='input'><input onChange={handleText} type="search" placeholder="Search food stuffs, categories"/></form>}
      <div>
        {!isProfilePage && <Link href="#"><a onClick={toggleDrop} className='bold'><img src="/icons/user.svg" alt="user"/><span>{user ? 'Profile' : 'Login'}</span><img style={{marginLeft : '3px'}} src='/icons/down.svg' alt='arrow'/></a></Link>}
        { showDrop &&
          <div className='dropdown'>
            <NavDrop />
          </div>
        }
        <Link href="/cart"><a className='bold'><img src="/icons/cart.svg" alt="cart"/><span className='numberItems'>{cart.cartItems.length}</span><span>Cart</span></a></Link>
        {isProfilePage && <Link href="#"><a onClick={logout} className='bold'>Log Out</a></Link>}
      </div>
    </nav>
    {showDrop &&
    <div onClick={toggleDrop} className='overlay'></div>
    }
      <style jsx>{`
        input {
          border: 1px solid #CFCFCFB3;
          padding: 8px;
          padding-left : 35px;
          width: 300px;
          background-image : url('/icons/search.svg');
          background-repeat : no-repeat;
          background-position : 7px 7px;
          background-size : 20px 20px;
          margin : auto;
          display : block;
          border-radius : 5px
        }
        .logo {
          width : 100px;
        }
        .logo:hover {
          cursor : pointer
        }
        .overlay {
          position : fixed;
          width : 100vw;
          height : 100vh;
          background : rgba(255, 255, 255, 0.4);
          z-index : 2;
          top : 0;
          left : 0
        }
        a{
          color: #464646;
          font-size : 15px;
          margin: 0 10px;
          font-family: 'Roboto', sans-serif;
        }
        a img {
          width : 16px;
          height: 16px;
          vertical-align : middle
        }
        a span {
          vertical-align : middle;
          margin-left : 5px
        }
        .nav {
          position : fixed;
          width: 100%;
          display : flex;
          flex-wrap : wrap;
          justify-content : space-around;
          background-color : white;
          padding : 20px;
          box-shadow : 2px 2px 4px #eee;
          z-index : 5
        }
        a span.numberItems {
          display: inline-block;
          height: 17px;
          width : 17px;
          text-align : center;
          background-color : var(--orange);
          color : white;
          border-radius : 50%;
          padding : 2px;
          font-size:10px;
          vertical-align: super;
          margin-bottom : -6px;
          margin-left : -5px
        }
        .dropdown {
          position : absolute;
          top : 100%;
          right : 5%;
          background : white;
          box-shadow : 0px 3px 6px #00000029, 0px -3px 6px #00000029;
          width : 200px;
          height : 150px;
          padding : 10px
        } 
        @media screen and (max-width : 709px) {
          .nav {
            justify-content : space-between;
            align-items : center;
            padding : 12px
          }
          .dropdown {
            top : 50%;
          }
          .nav .input, .nav img, .nav div {
            margin : 5px 0
          }
          input {
            width : 70vw;
            padding : 15px;
            padding-left: 40px;
            background-position : 8px 10px;
            background-size : 25px 25px;
          }
          .nav .input {
            order : 6;
            flex : 1 0 100%;
            margin-top : 10px
          }
        }
      `}
      </style>
    </>
  )
}