import Link from 'next/link';

export default () => {
  return (
    <footer className='footer'>
      <div className="footer-top flex-center">
        <div>
          <img className='footer-logo' src="/images/logo.png" alt="Ojaa Logo" />
        </div>
        <div className='download-links'>
          <a href='#'>
            <div className="download flex-align">
              <img src="/icons/google.svg" width="30px" height="30px" alt="Google play"/>
              <div className='flex-justify flex-column'>
                <span>Get it on</span>
                <span>GooglePlay</span>
              </div>
            </div>
          </a>
          <a href='#'>
            <div className="download flex-align">
              <img src="/icons/apple.svg" width="30px" height="30px" alt="App store"/>
              <div className='flex-justify flex-column'>
                <span>Get it on</span>
                <span>AppStore</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className='footer-inner flex-align'>
        <div>
          <p>CONTACT US</p>
          <span>info@ojaafoods.ng</span>
          <span>+234XXXXXXXX</span>
          <Link href='/'>
            <a>Help Center</a>
          </Link>
        </div>
        <div>
          <p>ABOUT US</p>
          <Link href='/'>
            <a>About Ojaa</a>
          </Link>
          <Link href='/'>
            <a>Our Privacy Policy</a>
          </Link>
          <Link href='/'>
            <a>Terms and Conditions</a>
          </Link>
        </div>
        <div>
          <p>ACCOUNT</p>
          <Link href='/login'>
            <a>Login</a>
          </Link>
          <Link href='/register'>
            <a>Create Account</a>
          </Link>
          <Link href='/forgot-password'>
            <a>Forgot Password</a>
          </Link>
        </div>
      </div>
      <div className="socials flex-center">
        <a target='_blank' rel='noopener noreferrer' href="https://twitter.com/ojaafoods"><div className='flex-center'><img width='30px' height='30px' src="/icons/twitter.svg" alt="Twitter link"/></div></a>
        <a target='_blank' rel='noopener noreferrer' href="https://facebook.com/ojaafoods.ng"><div className='flex-center'><img width='30px' height='30px' src="/icons/facebook.svg" alt="Facebook link"/></div></a>
        <a target='_blank' rel='noopener noreferrer' href="https://www.instagram.com/ojaafoods.ng/"><div className='flex-center'><img width='30px' height='30px' src="/icons/instagram.svg" alt="Instagram link"/></div></a>
      </div>
      <div className="footer-bottom">
        <span>&copy; Ojaa Food and Logistics Services Ltd</span>
      </div>
        <style jsx>{`
        .footer {
          background-color: var(--dark);
          color: white;
        }
        .footer-top {
          background-color : white;
          padding : 20px;
          color: black;
        }
        .footer-logo {
          margin-right : 25px;
          width : 110px;
        }
        .footer-top a {
          color: black;
          font-weight : bold;
          font-size : 13px
        }
        .download-links {
          display:flex
        }
        .download {
          padding: 2px;
          border-radius : 6px;
          border: 2.5px solid black;
          width : 120px;
          margin-right: 10px
        }
        .download div {
          padding-left: 3px;
        }
        .footer-inner {
          width : 50%;
          margin: auto;
          padding: 20px;
          justify-content : space-around
        }
        .footer-bottom {
          background-color : black;
          text-align : center;
          padding : 20px
        }
        .footer-inner a, .footer-inner span {
          color: white;
          display : block;
          margin : 8px 0;
          font-size : 13px
        }
        .footer p {
          font-size : 16px
        }
        .socials {
          padding: 20px;
        }
        .socials div {
          border-radius : 6px;
          margin: 8px;
          padding : 4px;
          background-color: white;
        }
        @media screen and (max-width : 910px) {
          .footer-inner {
            width : 60%
          }
        }
        @media screen and (max-width : 768px) {
          .footer-inner {
            width : 90%
          }
        }
        @media screen and (max-width : 468px) {
          .footer-top{
            flex-direction : column
          }
          .footer-logo {
            margin-bottom: 40px;
            margin-right : 0
          }
          .footer-inner {
            display : block
          }
          .footer-inner div {
            margin-bottom : 30px
          }
        }
    `}</style>
    </footer>
  )
}