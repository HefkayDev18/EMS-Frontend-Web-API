import ProductCard from "./ProductCard"
import { useEffect, useState, useMemo } from "react"

export default () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  useEffect(() => {
    fetch('http://api.ojaafoods.ng/products')
    .then(res => res.json())
    .then(data => setProducts(data.products))
    .catch(err => console.log(err))
  }, []);
  const handleChangeCategory = e => setCategory(e.target.name || e.target.parentNode.name);
  return(
    <div className='products'>
      <div className='products-header flex'>
        <span className='bold' style={{color : '#0F3646', textTransform:'capitalize'}}>{category}</span>
        <span className='bold' style={{color : '#B45303'}}>{products.length} PRODUCTS</span>
      </div>
      <div className='productsNav flex'>
        <button name='all' onClick={handleChangeCategory} className={category === 'all' ? 'active' : ''}>All</button>
        <button name='grains' onClick={handleChangeCategory} className={category === 'grains' ? 'active' : ''}><img src="/images/flours.png" alt="grains"/> Grains</button>
        <button name='vegetables' onClick={handleChangeCategory} className={category === 'vegetables' ? 'active' : ''}><img src="/images/veg.png" alt="vegs"/> Vegetables</button>
        <button name='oils' onClick={handleChangeCategory} className={category === 'oils' ? 'active' : ''}><img src="/images/spices.png" alt="oils"/> Oils</button>
        <button name='protein' onClick={handleChangeCategory} className={category === 'protein' ? 'active' : ''}><img src="/images/proteins.png" alt="proteins"/> Protein</button>
        <button name='spices' onClick={handleChangeCategory} className={category === 'spices' ? 'active' : ''}><img src="/images/spices.png" alt="spices"/> Spices</button>
        <button name='tubers' onClick={handleChangeCategory} className={category === 'tubers' ? 'active' : ''}><img src="/images/tubers.png" alt="tubers"/>  Tubers</button>
        <button name='fruits' onClick={handleChangeCategory} className={category === 'fruits' ? 'active' : ''}><img src="/images/fruits.png" alt="fruits"/> Fruits</button>
      </div>
      <div className='items flex'>
        {products.map(product => <> <ProductCard product={product} key={product._id} /> <ProductCard product={product} /> </>)}
      </div>
      <style jsx>{`
        .products {
          width : 85vw;
          margin : 40px auto;
          background-color : var(--light-gray);
          min-height : 600px;
        }
        .products-header {
          padding : 10px 20px;
          justify-content : space-between;
        }
        .productsNav, .products-header {
          border-bottom : 1px solid #A5A5A5E0;
        }
        .productsNav {
          padding : 10px;
          overflow-x : auto
        }
        .productsNav button {
          padding : 18px 20px;
          margin : 0 6px;
          display : flex;
          border-radius : 3px;
          background : none;
          font-weight : bold;
          colour : var(--gray-1);
        }
        .productsNav button.active {
          background-color : var(--orange-2);
          color : white
        }
        .productsNav button img {
          width : 14px;
          height : 14px;
          margin-right : 5px
        }
        .items {
          flex-wrap : wrap;
        }
        @media screen and (max-width : 800px) {
          .products{
            width : 95vw;
          }
        }
        @media screen and (max-width : 713px) {
          .products {
            width : 100%;
            padding : 8px
          }
        }
      `}</style>
    </div>
  )
}