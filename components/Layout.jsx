import Nav from './Nav'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div style={{paddingTop :'60px'}}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;