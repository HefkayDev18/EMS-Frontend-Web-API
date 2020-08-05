import { useDispatch } from "react-redux";
import { updateQuantity, removeProduct } from "../redux/cart/cart.actions";
import Link from "next/link";

export default ({ item }) => {
  const dispatch = useDispatch();
  const { name, measure, price, _id, slug } = item.product;
  const updateQ = (diff) => {
    dispatch(updateQuantity({ product : _id, quantity : item.quantity + diff}))
  }
  const removeP = () => dispatch(removeProduct(_id));
  return (
    <div className='flex cartItem'>
      <div className='cartItemImg'>
        <img src="/images/frame.png" width='80' height='80' alt="frame.png"/>
      </div>
      <div style={{width:'calc(100% - 85px)'}} className='flex-between flex r'>
        <div className='onr'>
          <div>
            <Link href='/product/[slug]' as={`/product/${slug}`}>
              <a className='bold pname'>{name}</a>
            </Link>
            <p className='pmeasure'>{measure}</p>
          </div>
          <div style={{padding : '8px'}} className='flex-align'>
            <button disabled={item.quantity === 1} onClick={() => updateQ(-1)} className='qButton minus'>-</button>
            <span>{item.quantity} </span> 
            <button onClick={() => updateQ(1)} className='qButton plus'>+</button>
          </div>
        </div>
        <div className='onr'>
          <div>
            <p className='bold price'>N{price}</p>
            <p className='q'>x{item.quantity} item(s)</p>
          </div>
          <div>
            <button onClick={removeP} className='removeBtn bold'>Remove</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .qButton {
          border : 1px solid #A8A8A8;
          background-color : white;
          font-weight : 900;
          color  :#000000E0;
          padding : 5px 8px;
        }
        .qButton.minus {
          margin-right : 7px;
        }
        .qButton.plus {
          margin-left : 7px;
        }
        p {
          margin : 3px;
        }
        .pname {
          color:  #2d2d2d;
          font-size : 20px;
          word-break : break-all
        }
        .price {
          color:  #2d2d2d;
          font-size : 18px;
        }
        .cartItem {
          align-items : center;
          padding : 10px
        }
        .cartItem:not(:last-child) {
          border-bottom : 1px solid #eee;
        }
        .pmeasure, .q {
          color : #585858
        }
        .removeBtn {
          color : #009BDC;
          background : none;
          padding : 8px;
        }
        .onr:first-child {
          width : 70%;
          padding-left : 12px;
        }
        .onr{
          width : 30%;
        }
        
        @media screen and (min-width : 615px) {
          .onr {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding : 8px;
            width: 50%
          }
        }
        @media screen and (max-width : 800px) {
          .r {
            justify-content : space-around
          }
        }
      `}</style>
    </div>
  )
}