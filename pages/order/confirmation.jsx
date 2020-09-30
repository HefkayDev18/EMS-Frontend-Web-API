import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router  from 'next/router'
import { API } from '../../redux/apiBase'
import { ToastContainer, toast, Flip } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { checkoutCart } from '../../redux/cart/cart.actions'

export const Loading = ({ text }) => {
  return (
    <>
      <div className='flex-center flex-column w'>
        <div className="loader flex-center"><div></div><div></div><div></div></div>
        <p className='bold'>{text}</p>
      </div>
      <style jsx>{`
        div.w {
          height : 60vh
        }
        .loader {
          display: inline-block;
          position: relative;
          width: 90px;
          height: 110px;
        }
        p{
          color : #333333;
          font-size : 20px
        }
        .loader div {
          display: inline-block;
          position: absolute;
          left: 8px;
          width: 16px;
          background: #F27D1DE0;
          animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        }
        .loader div:nth-child(1) {
          left: 8px;
          animation-delay: -0.24s;
        }
        .loader div:nth-child(2) {
          left: 32px;
          animation-delay: -0.12s;
        }
        .loader div:nth-child(3) {
          left: 56px;
          animation-delay: 0;
        }
        @keyframes loader {
          0% {
            top: 8px;
            height: 100px;
          }
          50%, 100% {
            top: 24px;
            height: 45px;
          }
        }
        
      `}</style>
    </>
  )
}

const Success = ({number}) => {
  return (
    <div className='flex-center flex-column bold'>
      <img src="/icons/order-complete.svg" alt="Order Complete"/>
      <p>Your order has been completed</p>
      <p>Order Number : <span className='orderNo'>{number}</span></p>
      <p className='small'>An order confirmation has been sent to your mail</p>
      <Link href='/'>
        <button>Back Home</button>
      </Link>
      <style jsx>{`
        img {
          width : 200px;
          height : 200px;
          object-fit : cover
        }
        div {
          color : #333333;
          font-size : 19px
        }
        .small {
          font-size : 15px
        }
        .orderNo {
          font-size : 25px;
          color : var(--orange-3)
        }
        button {
          padding : 19px;
          background : var(--orange);
          color : white;
          font-weight : bold;
          width : 200px;
          font-size : 18px;
          margin-bottom : 50px
        }
      `}</style>
    </div>
  )
}

const Failure = ({ retry }) => {
  return (
    <div className='flex-center flex-column bold'>
      <img src="/icons/order-failed.svg" alt="Order failed"/>
      <p>Order confirmation failed</p>
      <button onClick={() => retry()}>Retry</button>
      <style jsx>{`
        img {
          width : 200px;
          height : 200px;
          object-fit : cover
        }
        div {
          color : #333333;
          font-size : 19px
        }
        button {
          padding : 19px;
          background : var(--blue-1);
          color : white;
          font-weight : bold;
          width : 200px;
          font-size : 18px;
          margin-bottom : 50px
        }
      `}</style>
    </div>
  )
}

export default () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNo, setOrderNo] = useState(''); 
  const confirmOrder = () => {
    setLoading(true);
    setOrderNo('')
    fetch(API('/confirmOrder'), {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({ ref : Router.query.trxref })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        toast.error(data.error);
        setFailure(true);
      } else {
        setSuccess(true);
        setOrderNo(data.orderNo);
        dispatch(checkoutCart());
      }
    })
    .catch(err => {
      console.error(err);
      toast.error('Network Error, please retry');
      setFailure(true);
    })
    .finally(() => setLoading(false));
  }
  useEffect(() => {
    if(!Router.query.trxref) {
      Router.push('/')
    } else {
      confirmOrder();
    }
  }, [])
  return (
    <Layout>
      <div>
        { loading ? <Loading text='Please wait while we cofirm your order' /> : success ? <Success number={orderNo} /> : failure ?  <Failure retry={confirmOrder} /> : null}
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
    </Layout>
  )
}