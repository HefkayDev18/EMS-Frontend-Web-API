import Link from 'next/link'

export default ({ product }) => {
  let { name, price, measure, image, slug } = product;
  return (
    <div className='flex productCard'>
      <div className='flex-center' style={{width : '25%'}}>
        <img src='/images/frame.png' alt="" height='100%' width='100%'/>
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
            <button>ADD TO CART</button>
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
          color : var(--gray-2);
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
          padding : 6px;
          background: var(--orange-2);
          display : none;
        }
        .productCard:hover .productQuantities button {
          display : inline;
        }
        @media screen and (max-width:800px) {
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