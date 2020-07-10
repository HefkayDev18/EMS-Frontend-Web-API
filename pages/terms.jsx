import Layout from '../components/Layout'
import Head from 'next/head'

export default () => {
  return (
    <Layout>
      <Head>
        <title>Terms and Conditions</title>
        <meta name="description" content="Ojaafoods Terms and conditions. Ojaafoods Nigeria is a digital market platform developed to eliminate the rigours of shopping at local markets by providing increased access to varieties of fresh and affordable foodstuff, frozen foods, groceries, spices at the tap of a button." key="desc" />
        <meta property="og:title" content="Terms and Conditions" key="og-title" />
        <meta name="twitter:title" content="terms and conditions" key="twitter-title" />
      </Head>
      <div className="containers">
        <h2>Terms and Conditions</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quo iure dolore neque consequuntur repellendus velit dolor, in adipisci ab illum totam fuga unde corrupti hic delectus assumenda. Sapiente, repudiandae!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum numquam quibusdam accusamus et eveniet laboriosam cumque, enim dignissimos? Nemo saepe ipsum sint placeat nihil, accusantium ducimus accusamus expedita modi consequuntur?</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis alias blanditiis aperiam! Quaerat excepturi repudiandae, porro magni accusamus eveniet, rem omnis, aut quia est dolorum tempore nostrum veniam pariatur.</p>
      </div>
    </Layout>
  )
}
