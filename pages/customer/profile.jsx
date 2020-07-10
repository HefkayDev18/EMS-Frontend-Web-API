import Layout from "../../components/Layout"
import withPrivateRoute from "../../components/withPrivateRoute"
import Profile from "../../components/Profile";
import Head from 'next/head'


export default withPrivateRoute(() => {
  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>
      <Profile />
    </Layout>
  )
})