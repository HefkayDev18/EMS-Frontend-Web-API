import Layout from '../components/Layout'
import Link from 'next/link'
import Head from 'next/head'

export default () => {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | Ojaafoods</title>
        <meta name="description" content="Ojaafoods's Privacy Policy. Your privacy is important to us. It is Ojaa Foods &amp; Logistics Ltd.'s policy to respect your privacy regarding any information we may collect from you across our website" key="desc" />
        <meta property="og:title" content="Privacy Policy | Ojaafoods" key="og-title" />
        <meta name="twitter:title" content="Privacy Policy | Ojaafoods" key="twitter-title" />
        <meta property="og:description" content="Ojaafoods's Privacy Policy. Your privacy is important to us. It is Ojaa Foods &amp; Logistics Ltd.'s policy to respect your privacy regarding any information we may collect from you across our website" key="og-desc"/>
        <meta name="twitter:description" content="Ojaafoods's Privacy Policy. Your privacy is important to us. It is Ojaa Foods &amp; Logistics Ltd.'s policy to respect your privacy regarding any information we may collect from you across our website" key="twitter-desc"/>
      </Head>
      <div className='containers'>
        <h2>Privacy Policy</h2>
        <header>1. About this Policy</header> 
        <p>
          This Privacy and Cookie Notice provides information and directives on how Ojaa Foods &amp; Logistics Services Ltd collects and maintains and stores your personal data when you visit our website or mobile applications. 
        </p>
        <header>2. Collected Data</header> 
        <p>
          Data are collected, stored and processed to continually improve on our products and services. Data collected are used for marketing optimization purposes such as Google Digital Marketing. 
        </p>
        <header>3. How We Use Your Personal Data</header> 
        <p>
          We process your data to improve and develop the products and services that we offer.<br/><br/> Your data are used for the following on our platform:
          <ul>
            <li>To create an account for you as a new user on Ojaafoods platforms</li>
            <li>Delivering and processing your orders and enquiries</li>
            <li>Customer relationship management</li>
            <li>Enabling you to participate in surveys and promotions</li>
            <li>Improving our website, applications, products and services</li>
            <li>Complying with our legal obligations, including verifying your identity where necessary for fraud detection.</li>
          </ul>      
        </p> 
        <header>4. How We Share Your Personal Data</header>
        <p>
          We may need to share your personal data with third parties for the following purposes:<br/><br/> Sale of products and services: In order to deliver your products and services purchased on our platform from third parties, we may be required to provide your personal data to such third parties. ( Eg Logistics Companies, Financial Institution , marketing agencies etc )<br/><br/> Working with third party service providers: We engage third parties to perform certain functions on our behalf. Examples include fulfilling orders for products or services, delivering packages, analyzing data, providing marketing assistance, processing payments, transmitting content, assessing and managing credit risk.<br/><br/> Business transfers: As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, customer information may be transferred together with other business assets.<br/><br/> Detecting fraud and abuse: We release account and other personal data to other companies and organizations for fraud protection and credit risk reduction, and to comply with the law.<br/><br/> When we share your personal data with third parties we: require them to agree to use your data in accordance with the terms of this Privacy and Cookie Notice, our Privacy Policy and in accordance with the law; and only permit them to process your personal data for specified purposes and in accordance with our instructions. We do not allow our third-party service providers to use your personal data for their own purposes. 
        </p><header>5. Data Security</header>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.<br/> In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.<br/> We have put in place stringent procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so. 
        </p> 
        <header>6. Your Legal Rights</header>
        <p>
          It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.<br/> Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to opt-out, correct or erase your personal data, object to or restrict processing of your personal data, and unsubscribe from our emails and newsletters.
        </p>  
        <header>7. Further Details</header>
        <p>
          We respect the trust you place in Ojaa Foods &amp; Logistics Services Ltd. However, our privacy policy is subject to change at any time without notice. Ensure you check this policy document periodically.<br/><br/> If you are looking for more information on how we process and maintain your data please contact: info@ojaafoods.ng
        </p> 
      </div>
      <style jsx>{`
        header {
          color : #060606;
          font-weight : bold;
        }
        p {
          color : #444444;
          margin-bottom : 30px;
        }
      `}</style>
    </Layout>
  )
}