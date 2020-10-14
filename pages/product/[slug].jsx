import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { API } from '../../redux/apiBase'
import { addToCart } from '../../redux/cart/cart.actions'
import CartPop from '../../components/CartPop'

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
  const { name, image, price, measure, description, category, _id } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [quantity, setQuantity] = useState(0);
  const [added, setAdded] = useState(false);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity - 1);
  const addC = () => {
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
  }
  const inCart = cartItems.find(item => item.product._id === _id);
  useEffect(() => {
    if(inCart) setQuantity(inCart.quantity)
  }, [inCart])
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
              <p>Quantity <button disabled={quantity === 0} className='bold qb' onClick={decreaseQuantity}>-</button> {quantity} <button className='bold qb' onClick={increaseQuantity}>+</button></p>
              <p>Subtotal : <span className='subTotal'>N{quantity * price}</span><button className='cartBtn bold' onClick={addC}>ADD TO CART</button></p>
            </div>
          </div>
          <div className='desc'>
            <h3 className='dHead'>DESCRIPTION</h3>
            <p>{description}</p>
          </div>
          <CartPop show={added} />
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
          // max-width : 340px;
          height : 100%;
          object-fit: 100% 100%;
        }
        .productDetails {
          width : 60%;
          padding : 12px;
          padding-left : 56px;
        }
        .name {
          color : var(--gray-2);
          font-size : 2.53rem;
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
          padding : 15px 12px; 
        }
        .qb {
          border : 1px solid var(--gray-2);
          padding : 6px 8px;
          margin-right : 15px;
          margin-left : 15px;
          background : white;
          font-size : 18px
        }
        .desc p {
          color : #444444;
          white-space: pre-wrap;
        }
        .dHead {
          margin-top : 15px;
          border-bottom : 2px solid var(--orange-2);
          display : inline
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
          color : #232323
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
            max-width : 320px;
            width : 100%;
            height : auto;
          }
          .cartBtn {
            float : right;
          }
          .name {
            font-size : 1.8rem;
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
    props : {product : data.product || null, error :  data.error || null, relatedProducts : data.relatedProducts || null}, revalidate : 1000 * 60 * 60 
  }
}
