import Link from 'next/link'
import { useSelector } from 'react-redux'

export default () => {
  const user = useSelector(state => state.user.user);
  const { firstName, lastName, email, phone } = user;
  return (
    <>
      <div className='profileContainer flex flex-around'>
        <div className='profileHead flex'>
          <p>Account</p>
          <Link href='/customer/profile/edit'><button className='flex-center'><img src='/icons/pen.svg' alt='edit' /><span>Edit</span></button></Link>
        </div>
        <div className='userdetails'>
          <header>USER DETAILS</header>
          <div className='box'>
            <p className='bold'>{firstName + ' ' + lastName}</p>
            <p>{ email }</p>
          </div>
        </div>
        <div className='userAddress'>
          <header>DELIVERY DETAILS</header>
          <div className='box'>
            <div>
              <p className="bold">ADDRESS</p>
              <p>25, Ariya Lane, </p>
              <p>Off Ijoba, Surulere</p>
              <p>Shomolu</p>
              <p>Lagos</p>
            </div>
            <div>
              <p className="bold">PHONE</p>
              <p>{phone}</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        p {
          word-break : break-all;
        }
        p:not(:first-child) {
          color : #6A6A6A;
        }
        .profileHead {
          width : 100%;
          font-size : 22px;
          font-weight : bold
        }
        button {
          background : none;
          color : #707070;
          margin-left : 12px;
          font-weight : bold
        }
        img {
          width : 20px;
          height : 20px
        }
        .profileContainer {
          background : white;
          width : 75vw;
          margin : 75px auto;
          padding : 15px;
          flex-wrap : wrap
        }
        header {
          color : var(--orange-3);
          font-weight : bold;
          margin-bottom : 12px
        }
        .box {
          border : 1px solid #DCDCDC;
          border-radius : 3px;
          padding : 15px
        }
        .userdetails {
          width : 35%
        }
        .userAddress {
          width : 48%
        }
        @media screen and (max-width : 1000px) {
          .profileContainer {
            width : 90vw
          }
        }
        @media screen and (max-width : 800px) {
          .profileContainer {
            width : 97vw;
            flex-direction : column;
            padding : 30px
          }
          .userdetails {
            width : 100%;
          }
          .userAddress {
            margin-top : 20px;
            width : 100%;
          }
          .box {
            padding : 20px;
          }
          .profileHead {
            justify-content : space-between
          }
        }
      `}</style>
    </>
  )
}