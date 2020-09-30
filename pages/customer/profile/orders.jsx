import withPrivateRoute from "../../../components/withPrivateRoute";
import Layout from "../../../components/Layout";
import Head from 'next/head'
import Orders from "../../../components/Orders";

export default withPrivateRoute(() => {
  return(
    <Layout>
      <Head>
        <title>My Orders</title>
      </Head>
      <Orders />
    </Layout>
  )
})