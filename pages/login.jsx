import { useState, useMemo } from "react"
import Layout from "../components/Layout";
import Head from 'next/head';

export default () => {
  return(
    <Layout>
      <Head>
        <title>Login to Ojaa</title>
      </Head>
      <div style={{height : '60vh'}} className='flex-center flex-column'>
        <p>NO LOGIN YET</p>
      </div>
    </Layout>
  )
}