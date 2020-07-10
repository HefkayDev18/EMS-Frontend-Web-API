import Layout from "../components/Layout";
import ForgotPassword from '../components/ForgotPassword';
import Head from 'next/head'

export default () => {
  return (
    <Layout>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <ForgotPassword />
    </Layout>
  )
}