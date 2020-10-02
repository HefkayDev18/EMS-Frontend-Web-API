import Link from "next/link"
import { useSelector } from "react-redux"

export default ({show}) => {
  if(!show) {
    return <div></div>
  }
  const cart = useSelector(state => state.cart);
  let { cartTotal, cartItems } = cart;
  return (
    <div className='cartPop flex-center'>
      <div className='flex-between flex'>
        <span>TOTAL :</span>
        <span className='total'>N{cartTotal}</span>
      </div>
      <div className='flex flex-between'>
        <button className='noOfItems bold flex-center'><img src='/icons/cart-white.svg' alt='cart'/><span>{' '}{cartItems.length} ITEM(S)</span></button>
        <Link href='/cart'>
          <button className='toCart bold'>VIEW CART</button>
        </Link>
      </div>
      <style jsx>{`
        .cartPop {
          width : fit-content;
          background : white;
          position : sticky;
          bottom : 8px;
          left : 0;
          right : 0;
          margin : auto;
          padding : 6px 10px;
          font-weight : bold;
          box-shadow : 1px 1px 1px #999, -1px -1px 1px #999
        }
        .total {
          color : #005D84;
          margin-left : 12px
        }
        .cartPop div {
          padding : 8px;
        }
        button {
          padding : 12px;
          color : white;
        }
        .noOfItems {
          background : #005D84;
          outline : none;
          cursor : default;
          margin-right : 8px
        }
        .toCart {
          background : var(--orange)
        }
        @media screen and (max-width : 400px) {
          .cartPop {
            padding : 8px 0px;
            width : max-content
          }
          button {
            font-size : 12px;
            padding : 12px 8px
          }
          .total {
            margin-left : 3px
          }
        }
      `}</style>
    </div>
  )
}