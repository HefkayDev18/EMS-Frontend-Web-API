import Layout from '../../../components/Layout';
import EditPassword from '../../../components/EditPassword';
import withPrivateRoute from '../../../components/withPrivateRoute';
import Head from 'next/head'

export default withPrivateRoute(() => {
  return (
    <Layout>
      <Head>
        <title>Change Password</title>
      </Head>
      <EditPassword />
    </Layout>
  )
});