import Layout from "../components/Layout";
import Head from 'next/head';
import Login from "../components/Login";

export default () => {
  return(
    <Layout>
      <Head>
        <title>Login to Ojaa</title>
        <meta name="description" content="Login on Ojaa" key="desc"/>
        <meta property="og:description" content="Login on Ojaa" key="og-desc"/>
        <meta name="twitter:description" content="Login to Ojaa" key="twitter-desc" />
      </Head>
      <Login />
    </Layout>
  )
}