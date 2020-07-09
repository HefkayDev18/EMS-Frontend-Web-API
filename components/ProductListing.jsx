import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
import { API } from "../redux/apiBase";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryProducts } from "../redux/products/products.actions";
import Skeleton from 'react-loading-skeleton';

export default () => {
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products);
  const [category, setCategory] = useState('all');
  const [fetching, setfetching] = useState(true);
  const products = productsList[category].products;
  useEffect(() => {
    if(productsList[category].currentPage === 0) {
      setfetching(true);
      fetch(API(`/products/${category === 'all' ? '' : category}`))
      .then(res => res.json())
      .then(data => {
        dispatch(setCategoryProducts(category, data));
      })
      .catch(err => console.log(err))
      .finally(() => setfetching(false))
    }
  }, [category]);
  const loadMore = () => {
    setfetching(true);
    fetch(API(`/products/${category === 'all' ? '' : category}?page=${productsList[category].currentPage + 1}`))
    .then(res => res.json())
    .then(data => {
      dispatch(setCategoryProducts(category, data));
    })
    .catch(err => console.log(err))
    .finally(() => setfetching(false))
  }
  const handleChangeCategory = e => setCategory(e.target.name || e.target.parentNode.name);
  return(
    <div className='products'>
      <div className='products-header flex'>
        <span className='bold' style={{color : '#0F3646', textTransform:'capitalize'}}>{category}</span>
        <span className='bold' style={{color : '#B45303'}}>{products.length} PRODUCT{products.length === 1 ? '' : 'S'}</span>
      </div>
      <div className='productsNav flex'>
        <button name='all' onClick={handleChangeCategory} className={category === 'all' ? 'active' : ''}>All</button>
        <button name='grains' onClick={handleChangeCategory} className={category === 'grains' ? 'active' : ''}><img src="/images/flours.png" alt="grains"/> Grains</button>
        <button name='vegetables' onClick={handleChangeCategory} className={category === 'vegetables' ? 'active' : ''}><img src="/images/veg.png" alt="vegs"/> Vegetables</button>
        <button name='oils' onClick={handleChangeCategory} className={category === 'oils' ? 'active' : ''}><img src="/images/spices.png" alt="oils"/> Oils</button>
        <button name='proteins' onClick={handleChangeCategory} className={category === 'proteins' ? 'active' : ''}><img src="/images/proteins.png" alt="proteins"/> Protein</button>
        <button name='spices' onClick={handleChangeCategory} className={category === 'spices' ? 'active' : ''}><img src="/images/spices.png" alt="spices"/> Spices</button>
        <button name='tubers' onClick={handleChangeCategory} className={category === 'tubers' ? 'active' : ''}><img src="/images/tubers.png" alt="tubers"/>  Tubers</button>
        <button name='fruits' onClick={handleChangeCategory} className={category === 'fruits' ? 'active' : ''}><img src="/images/fruits.png" alt="fruits"/> Fruits</button>
      </div>
      <div className='items flex'>
        {products.map(product => <ProductCard product={product} key={product._id} />)}
      </div>
      {productsList[category].currentPage === 0 && fetching &&
        <div className='flex-center wrap'>
          <Skeleton width={300} height={120} style={{margin : '20px'}} />
          <Skeleton width={300} height={120} style={{margin : '20px'}} />
          <Skeleton width={300} height={120} style={{margin : '20px'}} />
        </div>
      }
      {!!productsList[category].currentPage && productsList[category].currentPage < productsList[category].pages &&
        <div>
          <button onClick={loadMore} className='loadButton'>LOAD MORE</button>
        </div>
      }
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
          overflow-x : auto;
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
        .loadButton {
          background-color : var(--orange-2);
          color : white;
          padding : 18px;
          font-weight : bold;
          width : 200px;
          display : block;
          margin : 15px auto
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
          .loadButton {
            width : 80%
          }
        }
      `}</style>
    </div>
  )
}