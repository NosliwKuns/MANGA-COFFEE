import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { fetchGetProducts } from '../../../features/products/productsSlice';
import useLocalStorage from '../../../app/customHooks/useLocalStorage';
import '../../../scss/Shop/ProductCards.scss';

type Props = {

}

const CardsProduct = ({}: Props) => {
  const [page, setPage] = useState(1);
  const [product, setProduct] = useLocalStorage('nose', '');
  /* const [p, setP] = useLocalStorage('page', '') */
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const a = useAppSelector(state => state.products)
  const b : any = a.products
  /* console.log(a.products); */

  const [fetchProducts, setFetchProducts] = useState<any>([]);

  /* const API_KEY_P = `http://localhost:5000/api/products?page=${page}&search=${search}` */
  
  useEffect(() => {
    dispatch(fetchGetProducts(page, search));
  },[dispatch, page, search]);

  useEffect(() => {
    setProduct(b)
  },[])
  
  console.log(a, 'roducts');
  console.log(b.products, 'lunch');

 
  return (
    <div className='product-container'>
      <div className="container">
        <div className="product-grid">
        <Link 
          to={`/product/${b.products && b.products[0]._id}`} 
          className="card stacked featured">
            <img src={b.products &&  b.products[0].product_image} alt="a grey baseball hat with a small palm tree on the front" className="card__img"/>
            <div className="card__content">
              <h2 className="card__title">Lorem, ipsum dolor.</h2>
              <p className="card__price">${b.products &&  b.products[0].price}</p>
              <p className="card__description">Lorem, ipsum dolor.</p>
          </div>
        </Link>
        {
          b.products?.slice(1).map((e : any) => {
            return (
              <Link to={`/product/${e._id}`}>
                <div className="card stacked">
                  <img src={e.product_image} alt="a grey baseball hat with a small palm tree on the front" className="card__img"/>
                  <div className="card__content">
                    <h2 className="card__title">Lorem, ipsum dolor.</h2>
                    <p className="card__price">${e.price}</p>
                    <p className="card__description">Lorem, ipsum dolor.</p>
                  </div>
                </div>
              </Link>
            )
          })
        }
          </div>

    </div>
    </div>
  )
};

export default CardsProduct;