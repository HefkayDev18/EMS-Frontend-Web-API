import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link'
import { logoutUser } from "../redux/user/user.actions";
import Router from 'next/router';

export default () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    Router.push('/');
  };
  return (
    <>
    { user.user && user.isLoggedIn ?
    <div className='contain flex flex-column flex-between'>
      <div>{user.user.firstName + ' ' + user.user.lastName}</div>
      <div className='flex-align'><img src="/icons/user-round.svg" alt="user"/> <Link href='/customer/profile'><a>PROFILE</a></Link></div>
      <div className='flex-align'><img src="/icons/orders.svg" alt="order"/> <Link href='/customer/profile/orders'><a>ORDERS</a></Link></div>
      <div onClick={logout} className='flex-align logout'><img src="/icons/logout.svg" alt="logout"/>LOG OUT</div>
    </div>
    :
    <div className='contain flex flex-column flex-around'>
      <div className='flex-align'><img src="/icons/user-round.svg" alt="user"/> <Link href='/login'><a>LOGIN</a></Link></div>
      <div>
        <Link href='/register'><button className='bold'>CREATE ACCOUNT</button></Link>
      </div>
    </div>
    }
      <style jsx>{`
        .contain {
          width : 100%;
          height : 100%;
          color : #4B4B4B;
        }
        a {
          color : #4B4B4B;
          margin : 8px 0
        }
        button {
          padding : 10px;
          width : 100%;
          background : #009BDC;
          color : white
        }
        .logout {
          margin : 8px 0; 
        }
        .logout:hover {
          cursor : pointer;
        }
        img {
          height : 30px;
          width : 30px;
          margin-right : 10px
        }
      `}</style>
      </>
  )
}