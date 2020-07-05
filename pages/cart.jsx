import Layout from "../components/Layout"
import withPrivateRoute from "../components/withPrivateRoute"

export default withPrivateRoute(() => {
  return(
    <Layout>
      <div style={{height : '60vh'}} className='flex-center'>
        <h1>No Cart Page yet</h1>
      </div>
    </Layout>
  )
});