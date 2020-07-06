import Nav from './Nav'
import Footer from './Footer'

const Layout = ({ children }) => {
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
            padding-top : 79px
          }
          @media screen and (max-width : 709px) {
            main {
              padding-top : 136px
            }
          }
          `
        }
      </style>
    </div>
  );
}

export default Layout;