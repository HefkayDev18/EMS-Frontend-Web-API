import Link from "next/link"
import { useSelector } from "react-redux"

export default ({show}) => {
  if(!show) {
    return <div></div>
  }
  const cart = useSelector(state => state.cart);
  let { cartTotal, cartItems } = cart;
  return (
    <div className='cartPop'>
      <div className='flex-between flex'>
        <span>TOTAL</span>
        <span className='total'>N{cartTotal}</span>
      </div>
      <div className='flex flex-between'>
        <button className='noOfItems bold flex-center'><img src='/icons/cart-white.svg' alt='cart'/><span>{' '}{cartItems.length} ITEM(S)</span></button>
        <Link href='/cart'>
          <button className='toCart bold'>CART</button>
        </Link>
      </div>
      <style jsx>{`
        .cartPop {
          width : 288px;
          background : white;
          position : sticky;
          bottom : 2px;
          left : 0;
          right : 0;
          margin : auto;
          padding : 10px;
          font-weight : bold;
          box-shadow : 1px 1px 1px #999, -1px -1px 1px #999
        }
        .total {
          color : #005D84;
        }
        .cartPop div {
          padding : 8px;
        }
        button {
          width : 48%;
          padding : 12px;
          color : white;
        }
        .noOfItems {
          background : #005D84;
          outline : none;
          cursor : default
        }
        .toCart {
          background : var(--orange)
        }
      `}</style>
    </div>
  )
}