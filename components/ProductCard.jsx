export default ({ product }) => {
  let { name, price, measure, image } = product;
  return (
    <div className='flex productCard'>
      <div className='flex-center' style={{width : '25%'}}>
        <img src="/images/frame.png" alt="" height='100%' width='100%'/>
      </div>
      <div className='flex flex-column' style={{width : '75%', justifyContent :'space-between'}}>
        <div className='productDetails'>
          <span className='bolder pName'>{name}</span>
        </div>
        <div className='productQuantities flex'>
          <div className='flex flex-column'>
            <span className='pMeasure bold'>{measure}</span>
            <span className='pPrice bolder'>N{price}</span>
          </div>
          <div style={{alignSelf:'flex-end'}}>
            <button>-</button>
            <span className='bold'>0</span>
            <button>+</button>
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
          font-weight : 900;
          font-size : 17px;
          padding : 5px 8px;
          background: white;
          margin : 0 11px;
          border : 1px solid #A8A8A8;
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