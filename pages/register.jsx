import Layout from "../components/Layout";
import Head from 'next/head';
import Register from "../components/Register";

export default () => {
  return(
    <Layout>
      <Head>
        <title>Create Account on Ojaa</title>
        <meta name="description" content="Create and account on Ojaafoods"/>
        <meta property="og:description" content="Create and account on Ojaafoods"/>
        <meta name="keywords" content="Login to ojaa ojaalogin register create account"/>
        <meta name="twitter:description" content="Create and account on Ojaafoods" />
      </Head>
      <Register />
    </Layout>
  )
}