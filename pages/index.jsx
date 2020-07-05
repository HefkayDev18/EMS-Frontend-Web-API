import Layout from "../components/Layout";
import Head from 'next/head'

export default () => {
  return (
    <Layout>
      <Head>
        <title>Ojaa Foods</title>
      </Head>
      <div style={{height : '60vh'}} className='flex-center'>
        <h1>Products go here</h1>
      </div>
    </Layout>
  )
};