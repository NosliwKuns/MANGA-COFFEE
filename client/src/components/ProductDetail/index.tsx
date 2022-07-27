import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { fetchDetailManga, fetchCleanDetails } from '../../features/products/productsSlice';
import { FetchAddToWishlist, FetchModifyCart } from '../../features/user/userSlice';
import { IoIosHeart } from "react-icons/io";
import useHeaders from "../../app/headers";
import { BsFillInfoCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FetchAddCart } from '../../features/user/userSlice'
import '../../scss/Shop/ProductDetail.scss'

type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
}
const ProductDetail = ({ setProduct, product }: Props) => {
  const { id } = useParams();
  console.log("IDDDDDDDDDDDDD", id);
  console.log("TYPE OF IDDDDDDDDDDDDD", typeof(id));
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productDetail } = useAppSelector(state => state.products)
  const { token, user, verificated } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  const headers = useHeaders(token)

  console.log(productDetail);

  useEffect(() => {
    dispatch(fetchDetailManga(id))
    return () => {
      dispatch(fetchCleanDetails())
    }
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

  // const addToCard : any = (a : any, b: any, c: any) => {
  //   let order = {
  //     product_image : a,
  //     price: b,
  //     id : c,
  //     amount: 1
  //   }
  //   if (!product) {
  //     setProduct([order])
  //   } else {
  //     const add = product.find((e : any) => e.id === order.id)
  //     console.log(add)
  //     if(!add) setProduct([order, ...product]);
  //   }
  // }

  const handleClick = () => {
    if(user && !verificated) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><BsFillInfoCircleFill size={55}/> <h1>Please verify your account!</h1> <h3>Check your e-mail to verify your account</h3></>,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        confirmButtonText:
          'Ok',
        confirmButtonAriaLabel: 'Ok',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmButton'
        }
      })
    } else if(user && verificated) {
      dispatch(FetchAddToWishlist(userId, id, headers))
    } else if(!user && !verificated){
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><BsFillInfoCircleFill size={55}/> <h2>To add this product to the wishlist, you must Sign In!</h2></>,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        confirmButtonText:
          <div onClick={() => navigate("/logeo", { replace: true })} className="divSignIn">Sign In</div>,
        confirmButtonAriaLabel: 'Sign In',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmButton'
        }
      })
    }
}

const handleAddToCart = (productId: string) => {
  dispatch(FetchAddCart(userId, productId, 1, headers))
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    html: <><FaShoppingCart size={26} color={'#9394A9'} className="cart-icon"/><h2 className='PopUpText'>Product added to the Cart</h2></>,
    position: 'bottom-end',
    background: "#212429",
    showConfirmButton: false,
    confirmButtonAriaLabel: 'Ok',
    timer: 1500,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'confirmButton'
    }
  })
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
      <button onClick={() => handleAddToCart(productDetail._id)}>Add to cart</button>
      <Link to={`/buyProduct/${id}`}>
      <button>
        Buy
      </button>
      </Link>
    </div>
  )
};

export default ProductDetail;