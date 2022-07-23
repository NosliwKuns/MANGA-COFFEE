import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { fetchDetailManga } from '../../features/products/productsSlice';
import { FetchAddToWishlist } from '../../features/user/userSlice';
import { IoIosHeart } from "react-icons/io";
import useHeaders from "../../app/headers";

type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
}
const ProductDetail = ({ setProduct, product }: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector(state => state.products)
  const { token, user, verificated } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  const headers = useHeaders(token)

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

  const addToCard : any = (a : any, b: any, c: any) => {
    let order = {
      product_image : a,
      price: b,
      id : c,
      amount: 1
    }
    if (!product) {
      setProduct([order])
    } else {
      const add = product.find((e : any) => e.id === order.id)
      console.log(add)
      if(!add) setProduct([order, ...product]);
    }
  }

  const handleClick = () => {
    if(user && !verificated) {
        alert('Please verify your account!')
    } else if(user && verificated) {
      dispatch(FetchAddToWishlist(userId, id, headers))
    } else if(!user && !verificated){
        alert('To add Manga to favorites, you must Sign In!')
    }
}

  return (
    <div className="five">
      <h1>{name}</h1>
      <img src={product_image} alt={`P_${product_image}`} />
      <span>
          <button onClick={() => handleClick()}><IoIosHeart /></button>
      </span>
      <p>{description}</p>
      <h2>Price: ${price}</h2>
      <h2>Rating: {rating}</h2>
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
      <h2>Stock: {stock <= 10 
                  ? "Less than 10" 
                  : stock === 0 
                  ? "Out of stock" 
                  : stock}
      </h2>
      <button onClick={() => addToCard(product_image, price, id)}>Add to cart</button>
      <Link to={`/buyProduct/${id}`}>
      <button>
        Buy
      </button>
      </Link>
    </div>
  )
};

export default ProductDetail;