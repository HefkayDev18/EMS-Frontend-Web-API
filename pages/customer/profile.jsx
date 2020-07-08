import Layout from "../../components/Layout"
import withPrivateRoute from "../../components/withPrivateRoute"
import Profile from "../../components/Profile";


export default withPrivateRoute(() => {
  return (
    <Layout>
      <Profile />
    </Layout>
  )
})