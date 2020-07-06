import Layout from "../components/Layout";
import Head from 'next/head'
import ProductListing from "../components/ProductListing";

export default () => {
  return (
    <Layout>
      <Head>
        <title>Ojaa Foods</title>
      </Head>
      <ProductListing />
    </Layout>
  )
};