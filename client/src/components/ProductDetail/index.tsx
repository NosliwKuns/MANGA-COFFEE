import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { fetchDetailManga } from '../../features/products/productsSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector(state => state.products)
  console.log(productDetail);

  useEffect(() => {
    dispatch(fetchDetailManga(id))
  },[dispatch])

  const {
    name,
    product_image,
    description,
    price,
    rating,
    comments,
    stock
  } = productDetail

  return (
    <div className="five">
      <h1>{name}</h1>
      <img src={product_image} alt={`P_${product_image}`} />
      <p>{description}</p>
      <h2>{price}</h2>
      <h2>{rating}</h2>
      {
        comments?.map(e => {
          return (
            <div>
              <h3>{e?.name}</h3>
              <h3>{e?.body}</h3>
            </div>
          )
        })
      }
      <h2>{stock}</h2>
    </div>
  )
};

export default ProductDetail;