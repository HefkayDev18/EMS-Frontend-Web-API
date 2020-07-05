import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/user/user.actions';

export default () => {
  const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.cart);
  // const dispatch = useDispatch();
  return (
    <nav className='nav flex-align'>
      <Link href='/'><img src="/images/logo.png" alt="Ojaa Logo"/></Link>
      <div className='input'><input type="text" placeholder="Search food stuffs, categories"/></div>
      <div>
        <Link href="/"><a className='bold home-link'><img src="/icons/home.svg" alt="home"/> <span>Home</span></a></Link>
        <Link href="/login"><a className='bold'><img src="/icons/user.svg" alt="user"/><span>{user ? 'Profile' : 'Login'}</span></a></Link>
        <Link href="/cart"><a className='bold'><img src="/icons/cart.svg" alt="cart"/><span className='numberItems'>{cart.cartItems.length}</span><span>Cart</span></a></Link>
      </div>
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
        a{
          color: black;
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
          background-color : var(--main-gray);
          padding : 20px;
          box-shadow : 2px 2px 4px #eee;
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
        @media screen and (max-width : 700px) {
          .nav {
            justify-content : space-between;
            align-items : center;
            padding : 12px
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
          .home-link {
            display : none
          }
          .nav .input {
            order : 6;
            flex : 1 0 100%;
            margin-top : 10px
          }
        }
      `}
      </style>
    </nav>
  )
}