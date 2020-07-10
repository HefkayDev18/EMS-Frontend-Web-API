import Layout from "../components/Layout";
import Head from 'next/head';
import Register from "../components/Register";

export default () => {
  return(
    <Layout>
      <Head>
        <title>Create Account on Ojaa</title>
        <meta name="description" content="Create an account on Ojaafoods"/>
        <meta property="og:description" content="Create an account on Ojaafoods" key="og-desc"/>
        <meta name="twitter:description" content="Create an account on Ojaafoods" key="twitter-desc" />
      </Head>
      <Register />
    </Layout>
  )
}