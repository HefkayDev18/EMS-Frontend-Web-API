import Link from 'next/link';

export default () => {
  return (
    <nav className='nav flex-align'>
      <img src="/images/logo.png" alt="Ojaa Logo"/>
      <input type="text" placeholder="Search food stuffs, categories"/>
      <div>
        <Link href="/"><a className='bold'><img src="/icons/home.svg" alt="home"/> <span>Home</span></a></Link>
        <Link href="/login"><a className='bold'><img src="/icons/user.svg" alt="user"/><span>Login</span></a></Link>
        <Link href="/cart"><a className='bold'><img src="/icons/cart.svg" alt="cart"/><span className='numberItems'>10</span><span>Cart</span></a></Link>
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
          background-size : 20px 20px
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
          background-color : black;
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
            flex-direction : column;
            justify-content : center;
            align-items : center
          }
          .nav input {
            padding : 11px;
            padding-left: 35px
          }
          .nav input, .nav img, .nav div {
            margin : 5px 0
          }
        }
      `}
      </style>
    </nav>
  )
}