import { useSelector, useDispatch } from "react-redux"
import Link from "next/link";
import GuestForm from "./GuestForm";
import { setEditingGuest } from "../redux/user/user.actions";
import { useEffect, useState } from "react";
import Router from "next/router";
import { API } from "../redux/apiBase";
import { ToastContainer, toast, Flip } from 'react-toastify';

const CheckoutItem = ({ item }) => {
  const { product } = item;
  return (
    <div className='flex item'>
      <div>
        <img src="/images/frame.png" alt="img" width='80' height='80'/>
      </div>
      <div style={{width:'calc(100% - 85px)', padding : '10px'}} className='flex flex-between'>
        <div className='fw'>
          <p className='pName bold'>{product.name}</p>
          <p className='pMeasure'>{product.measure}</p>
        </div>
        <div className='fw'>
          <p className='itemPrice bold'>N{product.price}</p>
          <p className='itemQ'>x{item.quantity} item(s)</p>
        </div>
        <div>
          <p className='itemTotal bold'>N{item.quantity * product.price}</p>
        </div>
      </div>
      <style jsx>{`
        p {
          margin : 3px 0;
        }
        .item {
          padding : 10px;
        }
        .item:not(:last-child) {
          border-bottom : 1px solid #eee
        }
        .pMeasure, .itemQ {
          color : #585858;
        }
        .itemPrice {
          color  #212121;
        }
        .itemTotal {
          font-size : 19px;
        }
        .fw {
          width : 33%
        }
        @media screen and (max-width : 468px) {
          .item {
            padding : 10px 2px
          }
        }
      `}</style>
    </div>
  )
}

const DeliveryDetails = () => {
  const user  = useSelector(state => state.user.user);
  const guest  = useSelector(state => state.user.guest);
  const dispatch = useDispatch();
  let customer = user || guest;
  let { firstName, lastName, email, address : { line1, line2, city_lga, state, phone } } = customer;
  const editGuest = () => dispatch(setEditingGuest());
  return (
    <div className='cont'>
      <div className='flex flex-between head'>
        <span className='bold'>DELIVERY DETAILS</span>
        {user ? 
        <Link href='/customer/profile/edit?redirectTo=/cart/checkout'>
          <button className='bold'>EDIT DETAILS</button>
        </Link> 
        :
        <button onClick={editGuest} className='bold'>EDIT DETAILS</button>
        }
      </div>
      <div  className='details'>
        <div className='flex'>
          <img style={{verticalAlign : 'bottom'}} src="/icons/user.svg" alt="user"/>
          <div>
            <p> {`${firstName} ${lastName}`}</p>
            <p>{email}</p>
          </div>
        </div>
        <div className="flex">
          <img style={{verticalAlign : 'bottom'}} src="/icons/location.svg" alt="location"/>
          <div>
            <p> {line1}</p>
            <p>{line2}</p>
            <p className='bold'>{city_lga}</p>
            <p className='bold'>{state}</p>
          </div>
        </div>
        <div className='flex'>
          <img style={{verticalAlign : 'bottom'}} src="/icons/phone.svg" alt="phone"/>
          <p> {phone}</p>
        </div>
      </div>
      <style jsx>{`
        .cont {
          color : #333;
          padding : 8px;
          padding-top : 0;
          font-weight : 500;
          font-size : 15px
        }
        button {
          color : var(--blue-1);
          background : none;
          padding : 6px
        }
        .head {
          border-bottom : 1px solid #d5d5d5;
          padding : 8px
        }
        img {
          width : 25px;
          height : 25px;
          margin-right : 9px
        }
        p {
          margin : 0
        }
        .details > div {
          padding : 12px
        }
      `}</style>
    </div>
  )
} 

export default () => {
  const cart  = useSelector(state => state.cart);
  const user  = useSelector(state => state.user.user);
  const guest  = useSelector(state => state.user.guest);
  const guestSet = useSelector(state => state.user.guestSet);
  const editingGuest = useSelector(state => state.user.editingGuest);
  const [ordering, setOrdering] = useState(false);
  useEffect(() => {
    if(!cart.cartItems.length) {
      Router.push('/cart')
    }
    if(user && !user.address.line1) {
      Router.push('/customer/profile/edit?redirectTo=/cart/checkout');
    }
  }, []);
  const initOrder = () => {
    setOrdering(true);
    if(user) {
      fetch(API('/order'), {
        method : 'POST',
        credentials : 'include',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ user : user._id })
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          toast.error(data.error)
        } else {
          window.location.href = 'https://checkout.paystack.com/' + data.access_code;
        } 
      })
      .catch(err => {
        console.error(err);
        toast.error('Network Error, please retry')
      })
      .finally(() => setOrdering(false))
    } else {
      let orderGuest = {...guest};
      let orderAddress = orderGuest.address;
      if(!orderAddress.line2) delete orderAddress.line2;
      delete orderGuest.address;
      let cartData = cart.cartItems.map(item => ({ product : item.product._id, quantity : item.quantity}));
      fetch(API('/order/guest'), {
        method : 'POST',
        credentials : 'include',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ guest : orderGuest, address : orderAddress, cartItems : cartData })
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          toast.error(data.error)
        } else {
          window.location.href = 'https://checkout.paystack.com/' + data.access_code;
        } 
      })
      .catch(err => {
        console.error(err);
        toast.error('Network Error, please retry')
      })
      .finally(() => setOrdering(false))
    }
  }
  return (
    <>
      <div className='cont'>
       <h2 className='bold'>Checkout</h2>
       <div className='checkoutContainer flex'>
        <div className='detailsArea flex-column flex'>
          <div className='customerInfo'>
            { user || (guestSet && !editingGuest) ? <DeliveryDetails /> : <GuestForm />}
          </div>
          <div className='itemsInfo'>
            <div className="itemsHead bold">CART ITEMS</div>
            <div className="items">
              {cart.cartItems.map(item => <CheckoutItem item={item} key={item.product._id} />)}
            </div>
          </div>
        </div>
        <div className='checkoutArea'>
          <div className='caHead bold CAsection'>
            PAYMENT SUMMARY
          </div>
          <div className='flex flex-between bold darkgray CAsection'>
            <span>SubTotal :</span>
            <span>N{cart.cartTotal}</span>
          </div>
          <div className='flex flex-between bold darkgray CAsection'>
            <span>Delivery Charge :</span>
            <span>N1500</span>
          </div>
          <div>
            <span className='grayText'><img style={{verticalAlign : 'bottom'}} src="/icons/interval.svg" alt="fast delivery"/>{` `}12 - 24 hours delivery</span>
          </div>
          <div className='flex flex-between bold CAsection'>
            <span>Total : </span>
            <span className='total'>N{ cart.cartTotal + 1500 }</span>
          </div>
          <div>
            <button onClick={initOrder} disabled={ordering || (!(user || (guestSet && !editingGuest)))} className='btnPayment'>{ ordering ? '...' : 'CONTINUE TO PAYMENT'}</button>
          </div>
          <div>
            <span className='grayText'><img style={{verticalAlign : 'bottom'}} src="/icons/lock.svg" alt="lock"/>{` `}Your payments are secured by Paystack</span>
          </div>
        </div>
       </div>
       <ToastContainer
          position="bottom-left"
          autoClose={3500}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          transition={Flip}
        />
      </div>
      <style jsx>{`
        .cont {
          width : 85vw;
          margin : auto
        }
        .detailsArea, .checkoutArea {
          margin : 5px;
        }
        .checkoutArea {
          background : white;
          padding : 8px;
        }
        .detailsArea {
         width : 80%;
        }
        .checkoutArea {
          width : 20%;
          min-width : 300px;
          margin-bottom : 50px;
          height : fit-content
        }
        .checkoutArea div {
          font-size : 14px;
          padding : 5px
        }
        .checkoutArea div.CAsection {
          border-bottom : 1px solid #D5D5D5;
          padding : 12px;
        }
        .caHead {
          color : #333333;
        }
        .total {
          color : var(--orange-3);
          font-size : 20px
        }
        .btnPayment {
          width: 100%;
          padding : 12px;
          background : #009BDC;
          color : white;
          margin : 20px 0;
        }
        .btnPayment:disabled{
          background : #A1A1A1
        } 
        .darkgray {
          color : #585858;
        }
        .grayText {
          color : #8D8D8D;
          font-weight : 600;
          font-size : 11px
        }
        .items, .customerInfo, .itemsHead {
          padding : 8px;
        }
        .customerInfo {
          background : white;
          margin-bottom : 12px
        }
        .itemsHead {
          background-color : #D5D5D5;
        }
        .items {
          background : white
        }
        @media screen and (max-width : 1000px) {
          .cont {
            width : 99vw
          }
        }
        @media screen and (max-width : 768px) {
          .checkoutContainer {
            flex-direction : column
          }
          .checkoutArea, .detailsArea {
            width : 100%
          }
          .itemsHead {
            background : white;
            padding : 15px;
            border-bottom : 2px solid #d5d5d5
          }
        }
      `}</style>
    </>
  )
}