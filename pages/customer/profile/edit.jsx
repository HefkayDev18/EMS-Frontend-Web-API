import Layout from "../../../components/Layout"
import Edit from "../../../components/Edit"
import withPrivateRoute from "../../../components/withPrivateRoute"
import Head from 'next/head'

export default withPrivateRoute(() => {
  return (
    <Layout>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <Edit />
    </Layout>
  )
})