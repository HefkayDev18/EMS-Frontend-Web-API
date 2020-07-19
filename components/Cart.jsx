import CartItem from "./CartItem"
import { useSelector } from "react-redux"
import Link from "next/link";

export default () => {
  const cart = useSelector(state => state.cart);
  if(!cart.cartItems.length) {
    return (
      <div className='flex-column flex-center'>
        <img src="/icons/cart-cart.svg" alt="Empty cart"/>
        <p>Your cart is empty!</p>
        <Link href='/'>
          <button>START SHOPPING</button>
        </Link>
        <style jsx>{`
          p {
            color : #9e9e9e;
            font-weight : 900;
            font-size : 24px;
          }
          button {
            background : var(--orange);
            padding : 12px;
            color : white;
            font-weight : bold;
            font-size : 18px;
            margin-bottom : 100px;
            width : 90vw;
            max-width : 500px
          }
        `}</style>
      </div>
    )
  }
  return (
    <div>
    <div className='flex-align flex-between cartTitle'>
      <h2 className='bold'>Shopping Cart</h2>
      <Link href='/'>
        <button className='continueBtn bold'>Continue Shopping</button>
      </Link>
    </div>
    <div className='cartDisplay'>
      <div className='itemsContainer'>
        <div className='box-header'>ITEMS</div>
        <div className='items'>
          {cart.cartItems.map(item => <CartItem key={item.product._id} item={item} />)}
        </div>
      </div>
      <div className='cartSummary'>
        <div className='flex flex-between'>
          <span className='bold cst'>ORDER SUMMARY</span>
          <span className='bold'>{cart.cartItems.length} items</span>
        </div>
        <div className='flex flex-between'>
          <span className='cst'>Total</span>
          <span className='bold cartTotal'>N{cart.cartTotal}</span>
        </div>
        <div>
          <button className='checkoutBtn bold'>PROCEED TO CHECKOUT</button>
          <p className='payText'><img style={{verticalAlign : 'bottom'}} src="/icons/lock.svg" alt="lock"/> Your transactions are secured by Paystack</p>
        </div>
      </div>
    </div>
    <style jsx>{`
        .cartDisplay {
          display: flex;
          width : 90vw;
          margin : 20px auto;
          margin-top : 10px;
        }
        .cartTitle{
          width : 90vw;
          margin : auto;
          padding : 5px
        }
        .continueBtn {
          background : var(--orange);
          padding : 12px;
          color :white;
        }
        .box-header {
          background-color : #D5D5D5;
          font-weight: bold;
          padding : 15px 
        }
        .itemsContainer, .cartSummary {
          background : white;
        }
        .cartSummary {
          margin-left : 8px
        }
        .items {
          padding : 8px;
        }
        .itemsContainer {
          width : 70%
        }
        .cartSummary {
          width : 30%;
          padding : 2px 10px;
          height : fit-content;
          font-size : 14px;
          max-width : 400px
        }
        .cst {
          color : #333333;
        }
        .cartTotal {
          color : var(--orange-3);
          font-size : 18px
        }
        .cartSummary div {
          padding : 12px 0;
        }
        .cartSummary div:not(:last-child) {
          border-bottom : 1px solid #eee
        }
        .checkoutBtn {
          width: 90%;
          margin: auto;
          display: block;
          padding: 14px;
          background : var(--orange);
          color : white;
        }
        .payText {
          color : #8D8D8D;
          margin : 15px 0px 0px;
          font-size : 12px
        }
        @media screen and (max-width : 1024px) {
          .cartDisplay, .cartTitle {
            width : 95vw
          }
        }
        @media screen and (max-width : 768px) {
          .cartDisplay {
            flex-direction : column;
            width : 100vw;
            align-items : center
          }
          .cartTitle {
            width : 100vw
          }
          .itemsContainer, .cartSummary {
            margin : 0px;
          }
          .itemsContainer {
            width : 100%;
          }
          .cartSummary {
            width : 100%;
            margin-left : 0px;
            margin-top : 20px
          }
        } 
      `}</style>
    </div>
  )
}