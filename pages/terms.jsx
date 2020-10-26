import Layout from '../components/Layout'
import Head from 'next/head'

const Terms = () => {
  return (
    <Layout>
      <Head>
        <title>Terms and Conditions</title>
        <meta name="description" content="Ojaafoods Terms and conditions. Ojaafoods Nigeria is a digital market platform developed to eliminate the rigours of shopping at local markets by providing increased access to varieties of fresh and affordable foodstuff, frozen foods, groceries, spices at the tap of a button." key="desc" />
        <meta property="og:title" content="Terms and Conditions" key="og-title" />
        <meta name="twitter:title" content="terms and conditions" key="twitter-title" />
      </Head>
      <div className='containers'>
        <h2>Terms and Conditions</h2>
        <p>
          The following terms and conditions and any other rules posted on “Ojaafoods” website, mobile
          app and other channels shall constitute an agreement between Ojaa Food and Logistics
          Services Ltd and you, the visitor, governing your access and use of all contents and
          functionalities available on our website and related micro-sites.
        </p>
        <p>
          For your convenience, we have listed below some general information   about ourselves:
          <ul>
            <li>
            "We" are Ojaa food Logistics {'&'} Services Limited (“Ojaafoods”), and "us" and ''our" have
a corresponding meaning herein.
            </li>
            <li>
            We are a private company incorporated in accordance with the laws of Nigeria
            </li>
          </ul>
        </p>
        <p>By visiting our channels and clicking on the check-out button, you are accepting and
        consenting to the practices described in this terms and conditions. These can be modified
        from time to time and your continued use of our channels following such change shall signify
        your agreement to be bound by the modified terms and conditions
        </p>
        <ul className='termsList'>
          <li>
            <header>Product Availability {'&'} Advance Payment</header> 
            <p>
            All orders are subject to acceptance and availability, and Items in your shopping cart are not
reserved and may be purchased by other customers. 
            </p>
            <p>
            Ojaa Food and Logistic Services Ltd offers products for sale that are in stock and available for
dispatch from our distribution centers. Occasionally however, we may be waiting for shipments
from our Foodstuff and Baby foods suppliers. Consequently, you may from time to time be
given the possibility of making an Advance Payment for “certain items “ in which case you are
able to make an Advance Purchase. This will ensure that you receive this item in priority.
            </p>
          </li>
          <li>
            <header>Limitations of liability.</header> 
            <p>
            <strong>Items You Purchase:</strong> Ojaafoods does not plant or manufacture any of the items sold through  her channels. We only provide the avenue; Ojaafoods can't and does not make any warranties  about the quality, safety, or even their legality. Kindly release Ojaafoods from any claims  related to items sold through her channels including for defective items, misrepresentations  by manufacturers, or items that caused physical injury. 
            </p>
            <p>
            <strong>Content You Access:</strong> You may come across materials that you find offensive or inappropriate  while using our Services. You shall release us from all liability relating to that content.
            </p>
            <p>
            <strong>Third-Party Services:</strong> Our Services may contain links to third-party websites or services that  we don’t own or control (for example, links to Payment platforms, Suppliers website,  Facebook, Instagram, Twitter etc). You may also need to use a third party’s product or service  in order to use some of our Services (like a compatible Laptop and mobile device to use our  mobile apps). When you access these third-party services, you do so at your own risk. The  third parties may require you to accept their own terms of use. Ojaafoods is not a party to  those agreements; they are solely between you and the third party.
            </p>
          </li>
          <li>
            <header>Intellectual property/trademark protection.</header> 
            <p>
            You acknowledge and agree that all copyright, designs, "look and feel" trademark of Ojaafoods Channels ( Website {'&'} Mobile app) and all other intellectual property and material rights  relating to the Content as herein described, including Software and all HTML and other code  contained in our Channels shall remain at all times vested in Ojaafood {'&'} Logistics Services  Ltd and/or are the property of their respective owners. All such Content, including third party  trademarks, designs and related intellectual property rights mentioned or displayed on our  channels are protected by federal and state laws and regulations and international treaty  provisions. You are permitted to use the Content only as expressly authorized by Ojaafood 
and Logistics services Ltd and/or its third party licensors. Any reproduction or redistribution of  the above listed Content is prohibited and may result in civil and criminal penalties. Violators  will be prosecuted to the fullest extent permissible under applicable law. Without limiting the  foregoing, copying and use of the above listed materials to any other server, location or  support for publication, reproduction or distribution is expressly prohibited.
            </p>
          </li>
          <li>
            <header>Pricing and payment terms and delivery</header>
            <p>Items listed on our platform will be priced with the Nigerian Currency ( Naira). All  transactions/orders processed on our platform must be paid fully with all the applicable  charges and not a partial payment transaction. Orders will be delivered in line with delivery  timeline applicable at the time of making the orders. Ojaafoods reserves the right to change  the time of delivery if confronted with challenges beyond her control E.g (Lockdown, Safety  and security reason, non- availability of stock).Customers will be notified accordingly should  we have reasons to change or delay the delivery timeline.</p>
            <p>
            Customers will take full responsibility as defined by Ojaafood and Logistic Services Ltd if they  are unavailable to take delivery of goods ordered on our platform within the stipulated delivery  time
            </p>
          </li>
          <li>
            <header>Promotional Codes</header>
            <p>The Promotional code is valid for a limited time only. Ojaafoods reserves the right to modify or cancel the promo code at any time.</p>
            <p>
            Each Promo code has a minimum purchase requirement and can be used only once, unless  otherwise stated.
            </p>
            <p>
            Promo code is not transferable, can not be resold or redeemed for cash.
            </p>
          </li>
          <li>
            <header>Returns and cancellations.</header>
            <p>
            We operate a no return and no refund policy. Once you place an order on our platform and  you check out you are not permitted to cancel your order. You cannot return goods delivered  nor request a refund. However, Ojaafood and Logistics Services Ltd places premium on  Excellence. We shall ensure goods processed for delivery are fresh and of good quality
            </p>
          </li>
          <li>
            <header>Dispute resolution </header>
            <p>
            If you are upset with us, let us know, and hopefully we can resolve the issue amicably without  recourse to legal proceedings at all.
            </p>
          </li>
        </ul>
        
      </div>
      <style jsx>{`
        ul.termsList {
          padding-left : 20px;
        }
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

export default Terms