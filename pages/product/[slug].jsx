import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { API } from '../../redux/apiBase'

export default ({ product, error, relatedProducts }) => {
  const router = useRouter()
  if(router.isFallback) {
    return <div style={{width : '100vw', height : '100vh', textAlign : 'center'}} className='flex-center'>
      <div>
        <img width='200px' height='auto' src="/images/logo.png" alt="Ojaa logo"/>
        <p>Getting Product...</p>
      </div>
    </div>
  }
  if(error) {
    return <div style={{width : '100vw', height : '100vh', textAlign : 'center'}} className='flex-center'>
      <div>
        <img width='200px' height='auto' src="/images/logo.png" alt="Ojaa logo"/>
        <p>Oops! Looks like you followed a broken link</p>
        <p><Link href="/"><a>Back Home</a></Link></p>
      </div>
    </div>
  }
  // const user = useSelector(state => state.user.user);
  const { name, image, price, measure, description, category } = product;
  return (
    <Layout>
      <>
        <Head>
          <title>{`Buy ${name} on Ojaafoods`}</title>
          <meta name="description" content={description} key="desc" />
          <meta name="twitter:title" content={`Buy ${name} on Ojaafoods`} key="twitter-title" />
          <meta name="twitter:description" content={description} key="twitter-desc" />
          <meta name="twitter:image" content={image} key="twitter-image" />
          <meta property="og:title" content={`Buy ${name} on Ojaafoods`} key="og-title" />
          <meta property="og:image" content={image} key="og-image" />
          <meta property="og:description" content={description} key="og-desc"/>
        </Head>
        <div className="productContainer">
          <div className="flex productUpper">
            <div className="productImg">
              <img src='/images/frame@2x.png' alt={name}/>
            </div>
            <div className='productDetails flex flex-column flex-between'>
              <div className='np'>
                <h1 className="name">{name}</h1>
                <h2 className="price">N{price}</h2>
              </div>
              <p>Measurement : {measure}</p>
              <p>Poduct Category : {category}</p>
              <p>Quantity <button className='bold qb'>-</button> 0 <button className='bold qb'>+</button></p>
              <p>Subtotal : <span className='subTotal'>N0</span><button className='cartBtn'>ADD TO CART</button></p>
            </div>
          </div>
          <div>
            <h3>DESCRIPTION</h3>
            <p>{description}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae accusantium recusandae in, reprehenderit tempora est non voluptatum cum deserunt nisi, ratione quisquam exercitationem esse fugit quia laboriosam repellendus adipisci odio!</p>
          </div>
        </div>
        <div className='productContainer'>
          <h3>Related products</h3>
          <div className="relatedProducts flex">
            {relatedProducts.map(rp => 
              <Link as={`/product/${rp.slug}`} href='/product/[slug]' key={rp._id}>
                <a>
                <div className='relatedProduct flex flex-column flex-center'>
                  <img width='150px' height='150px' src='/images/frame.png' alt={rp.name} />
                  <span className='rpName'>{rp.name}</span>
                </div></a>
              </Link>
            )}
          </div>
        </div>
      </>
      <style jsx>{`
        h1, h2 {
          margin : 4px
        }
        p {
          margin : 12px 5px;
        }
        .productContainer {
          width : 80vw;
          background : white;
          margin : 50px auto;
          padding : 15px;
          font-weight : bold
        }
        .productUpper {
          width : 100%;
          height : 340px
        }
        .productImg {
          width : 40%;
          padding : 12px
        }
        img {
          object-fit : cover;
        }
        .productImg img{
          width : 100%;
          height : 100%;
        }
        .productDetails {
          width : 60%;
          padding : 12px;
          padding-left : 56px;
        }
        .name {
          color : var(--gray-2);
        }
        .price, .subTotal {
          color : var(--orange-3);
          font-size : 22px
        }
        .subTotal {
          margin-left : 10px;
        }
        .cartBtn {
          margin-left : 10px;
          background : var(--orange);
          color : white;
          padding : 10px
        }
        .qb {
          border : 1px solid var(--gray-2);
          padding : 6px;
          margin-right : 10px;
          margin-left : 10px;
          background : white;
          font-size : 18px
        }
        .relatedProducts {
          overflow : auto;
        }
        .relatedProducts div{
          margin: 10px;
        }
        .relatedProducts div:hover{
          cursor : pointer;
        }
        .rpName {
          font-size : 20px;
          color : var(--orange-2)
        }
        @media screen and (max-width : 768px) {
          .np {
            display : flex;
            justify-content : space-between
          }
          .productContainer {
            width : 93vw;
          }
          .productUpper {
            flex-direction : column;
            height : auto
          }
          .productImg {
            width : 100%;
            padding : 12px;
            display : flex;
            justify-content : center
          }
          .productDetails {
            width : 100%;
            padding : 12px;
            padding-left : 0;
          }
          .productImg img{
            max-width : none;
            width : 100%;
            height : auto;
          }
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticPaths() {
  const products = await fetch(API('/products'));
  const data = await products.json();
  const paths = data.products.map(prod => ({
     params : { slug : prod.slug  }
  }));
  return {
    paths, fallback : true
  }
}

export async function getStaticProps({ params }) {
  const product = await fetch(API(`/product/slug/${params.slug}`));
  const data = await product.json();
  return {
    props : {product : data.product || null, error :  data.error || null, relatedProducts : data.relatedProducts || null} 
  }
}
