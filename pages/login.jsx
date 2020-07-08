import Layout from "../components/Layout";
import Head from 'next/head';
import Login from "../components/Login";

export default () => {
  return(
    <Layout>
      <Head>
        <title>Login to Ojaa</title>
        <meta name="description" content="Login on Ojaa"/>
        <meta property="og:description" content="Login on Ojaa"/>
        <meta name="keywords" content="Login to ojaa ojaalogin"/>
        <meta name="twitter:description" content="Login to Ojaa" />
      </Head>
      <Login />
    </Layout>
  )
}