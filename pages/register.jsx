import Layout from "../components/Layout";
import Head from 'next/head';
import Register from "../components/Register";

export default () => {
  return(
    <Layout>
      <Head>
        <title>Create Account on Ojaa</title>
      </Head>
      <Register />
    </Layout>
  )
}