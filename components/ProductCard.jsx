import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cart.actions';

export default ({ product }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  let { name, price, measure, image, slug } = product;
  const inCart = !!cartItems.find(item => item.product._id === product._id);
  const dispatch = useDispatch();
  const addItem = () => dispatch(addToCart({product, quantity : 1}));
  return (
    <div className='flex productCard'>
      <div className='flex-center' style={{width : '25%'}}>
        <img src='/images/frame.png' alt={name} height='100%' width='100%'/>
      </div>
      <div className='flex flex-column' style={{width : '75%', justifyContent :'space-between'}}>
        <div className='productDetails'>
          <Link as={`/product/${slug}`} href='/product/[slug]'><a><span className='bolder pName'>{name}</span></a></Link>
        </div>
        <div className='productQuantities flex'>
          <div className='flex flex-column'>
            <span className='pMeasure bold'>{measure}</span>
            <span className='pPrice bolder'>N{price}</span>
          </div>
          <div style={{alignSelf:'flex-end'}}>
            <button disabled={inCart} onClick={addItem}>{inCart ? 'IN CART' : 'ADD TO CART'}</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .productCard {
          background-color : white;
          width : 340px;
          margin : 14px auto;
          padding : 10px;
          border-radius : 8px;
          height : 110px
        }
        .productDetails {
          padding-left : 10px;
          justify-content : space-between;
        }
        .pName {
          color : #393939d9;
          font-size : 18px;
        }
        .pMeasure {
          color : var(--gray-3);
        }
        .pPrice {
          color : var(--orange-3);
          font-size : 17px
        }
        .productQuantities {
          padding-left : 10px;
          justify-content : space-between
        }
        .productQuantities button {
          font-weight : bold;
          color : white;
          padding : 12px 8px;
          background: var(--orange-2);
          display : none;
        }
        .productCard:hover .productQuantities button {
          display : inline;
        }
        @media screen and (max-width:1025px) {
          .productQuantities button {
            display : inline;
          }
        }
        @media screen and (max-width : 690px) {
          .productCard{
            width : 100%;
          }
        }
      `}</style>
    </div>
  );
}