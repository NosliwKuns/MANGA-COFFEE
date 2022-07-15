import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { fetchGetProducts } from '../../../features/products/productsSlice';
import useLocalStorage from '../../../app/customHooks/useLocalStorage';

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
  
  console.log(search, 'roducts');
  console.log(product, 'lunch');

 
  return (
    <div>
      <h2 >soy el componente cards productw</h2>
      {/* <button onClick={() => {setSearch(''); setProduct('b')}}>x</button> */}
      <button onClick={() => {setPage(1)}}>page</button>
      <button onClick={() => {setProduct('sakura')}}>mas</button>
      <button onClick={() => {setProduct(b)}}>porfa</button>
      <textarea onChange={e => {setSearch(e.target.value)}} value={search} />
      {b.products?.map((p : any) => {
        return (
          <Link to={`/product/${p._id}`}>
            <img src={p.product_image} alt={`Product_${p.product_name}`} />
            <h2>{p.name}</h2>
          </Link>
        )
      })}
    </div>
  )
};

export default CardsProduct;