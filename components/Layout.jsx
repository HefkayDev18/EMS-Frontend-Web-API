import Nav from './Nav'
import Footer from './Footer'
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const home = router.pathname === '/';
  return (
    <div>
      <Nav />
      <main>
        {children}
      </main>
      <Footer />
      <style jsx>
        {
          `
          main{
            padding-top : 79px;
            min-height : 70vh
          }
          @media screen and (max-width : 709px) {
            main {
              padding-top : ${!home ? '79px' : '136px'}
            }
          }
          `
        }
      </style>
    </div>
  );
}

export default Layout;