import Layout from '../components/Layout'
import Head from 'next/head'

export default () => {
  return (
    <Layout>
      <Head>
        <title>About Ojaafoods</title>
        <meta name="description" content="About Ojaafoods. Ojaafoods Nigeria is a digital market platform developed to eliminate the rigours of shopping at local markets by providing increased access to varieties of fresh and affordable foodstuff, frozen foods, groceries, spices at the tap of a button." key="desc" />
        <meta property="og:title" content="About Ojaafoods" key="og-title" />
        <meta name="twitter:title" content="About Ojaafoods" key="twitter-title" />
      </Head>
      <div className='containers'>
        <h2>About Ojaafoods</h2>
        <h3>Who we are :</h3>
        <p>
          Ojaafoods Nigeria is a digital market platform developed to eliminate the rigours of shopping at local markets by providing increased access to varieties of fresh and affordable foodstuff, frozen foods, groceries, spices at the tap of a button.
        </p>
        <p>
          With our reliable and cost efficient logistics service, your orders will be delivered to your doorstep promptly.
        </p>
        <p>
          Our solution was built to reduce human contact within the community markets as we fight the scourge offer Covid-19 and other transmissible diseases.
        </p>
        <h3>Contact Us</h3>
        <h5>Ojaa Food {'&'} Logistics Services Ltd.</h5>
        <h5>Ikeja, Lagos</h5>
        <p>customercare@ojaafoods.ng,  +234(0) 809 899 4599, +234(0) 913 186 8887</p>
      </div>
    </Layout>
  )
}