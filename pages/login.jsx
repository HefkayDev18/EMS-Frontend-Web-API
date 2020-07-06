import Layout from "../components/Layout";
import Head from 'next/head';
import Login from "../components/Login";

export default () => {
  return(
    <Layout>
      <Head>
        <title>Login to Ojaa</title>
      </Head>
      <Login />
    </Layout>
  )
}