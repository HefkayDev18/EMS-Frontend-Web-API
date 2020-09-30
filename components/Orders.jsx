import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { API } from "../redux/apiBase"

const OrderCard = ({ amount, createdAt, orderNo, deliveryAddress, cart, status }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className='flex flex-column'>
      <div className='card flex flex-column'>
        <div className='top flex flex-between'>
          <div><span className='bold dcolor'>Date :</span><span className='bold date'>{new Date(createdAt).toDateString()}</span></div>
          <div><span className='bold dcolor'>Order No :</span><span className='orderNo bold'>{orderNo}</span></div>
        </div>
        <div className='bottom flex flex-between'>
          <div><span className='bold dcolor'>Total :</span><span className='total bold'>N{amount}</span></div>
          {!showMore ?
          <div><button onClick={() => setShowMore(true)} className='orange'>View Order</button></div>
          :
          <div><span>Status  :</span><span className='status'>{status}</span></div>
        }
        </div>
      </div>
      {showMore &&
      <>
        <div className='card'>
          <div className="top">
            <span className="bold">Delivery Address</span>
          </div>
          <div className="bottom deliveryAddress">
            <p>{deliveryAddress.line1}</p>
            <p>{deliveryAddress.line2 || ''}</p>
            <p>{deliveryAddress.city_lga}</p>
            <p>{deliveryAddress.state}</p>
            <p>{deliveryAddress.phone}</p>
          </div>
        </div>
        <div className="card">
          <div className="top">
            <span className="bold">Payment Method</span>
          </div>
          <div className="bottom">
            <span className='payText'>Paid online via Paystack</span>
          </div>
        </div>
        <div className="card">
          <div className="top">
            <span className="bold">Items ordered</span>
          </div>
          <div className="bottom">
            <div className='flex itemsContainer'>
              {cart.cartItems.map(item => {
                const { product : { name, image, measure, _id }, checkoutPrice, quantity } = item;
                return(
                  <div key={_id} className='flex-column flex-center productCard'>
                    <img height='90' width='90' src={image} alt={name}/>
                    <span className='bold pNname'>{name} - {measure}</span>
                    <span className='orange'>N{checkoutPrice}</span>
                    <span className='pQ'>x {quantity}</span>
                  </div>
                )
              })}
            </div>
            <button className='orange collapse' onClick={() => setShowMore(false)}>Collapse Order</button>
          </div>
        </div>
      </>}
      <style jsx>{`
        p {
          margin : 0
        }
        .card {
          margin-bottom : 20px;
          padding : 12px;
          background : white;
          box-shadow : 0px 3px 5px 5px #00000003;
        }
        .top {
          border-bottom : 1px solid #DEDEDE;
          padding : 8px 0;
        }
        .bottom {
          padding : 12px 0;
        }
        .status {
          color : #f1f1f1;
          background : #9e9e9e;
          padding : 4px 8px
        }
        .orderNo {
          color : #393939E0
        }
        .total,
        .deliveryAddress, .payText {
          color : #5B5B5B
        }
        button {
          background : none;
          outline : none;
          padding : 8px
        }
        .collapse {
          float : right;
          padding : 19px 10px;
        }
        .orange {
          color : var(--orange);
          font-weight : bold
        }
        span:first-child {
          margin-right : 12px
        }
        .dcolor { 
          color : #0A0A0A
        }
        .date {
          color : #131313
        }
        .itemsContainer {
          overflow-x : auto
        }
        .productCard {
          margin-right : 13px;
          min-width : max-content
        }
        .pName, .pQ {
          color : #505050
        }
      `}</style>
    </div>
  )
}

export default () => {
  const user = useSelector(state => state.user.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders()
  }, [])
  const fetchOrders = (page = 1) => {
    fetch(API(`/orders/${user._id}?page=${page}`), {
      credentials : 'include'
    })
    .then(res => res.json())
    .then(data => {
      setOrders(p => [...p, ...data.orders]);
    })
    .catch(err => {
      console.log(err)
    })
  }
  return(
    <div>
      <h2>My Orders</h2>
      {orders.map(order => <OrderCard key={order._id} {...order}/>)}
      <style jsx>{`
        div {
          width : 60vw;
          margin : auto;
        }
        @media screen and (max-width : 768px) {
          div {
            width : 90vw
          }
        }
      `}</style>
    </div>
  )
}