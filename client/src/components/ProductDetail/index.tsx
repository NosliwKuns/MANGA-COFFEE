import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { fetchDetailManga, fetchCleanDetails } from '../../features/products/productsSlice';
import { FetchAddToWishlist } from '../../features/user/userSlice';
import { IoIosHeart } from "react-icons/io";
import useHeaders from "../../app/headers";
import { BsFillInfoCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import '../../scss/Shop/ProductDetail.scss'
import useLocalStorage from '../../app/customHooks/useLocalStorage'
import { FaShoppingCart } from "react-icons/fa";

type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
  setClickBuy: any
}
const ProductDetail = ({ setProduct, product, setClickBuy }: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productDetail } = useAppSelector(state => state.products)
  const { token, user, verificated, wishlist } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  const headers = useHeaders(token)
  const [addProduct, setAddProduct] = useLocalStorage('prod', [])
  
  let wish = wishlist?.find(e => e._id === id) ? true : false;

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

  const addToCard : any = (a : any, b: any, c: any, d: any, e: any) => {
    let order = {
      product_image : a,
      price: b,
      id : c,
      amount: 1,
      name: d, 
      stock: e
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

  const handleNotUser = () => {
    if(!user && !verificated) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><BsFillInfoCircleFill size={55}/> <h2>To buy, you must Sign In!</h2></>,
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
    } else if(user && !verificated) {
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
    }
  }

  const handleBuy = () => {
    setAddProduct([productDetail])
    setClickBuy("indBuy")
    navigate(`/buyProduct`)
  }

  const hanldeAddToCartDetail = () => {
    addToCard(product_image, price, id, name, stock)
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
    <div className="five detail-container-product">
      <title><h2>{name}</h2></title>
      <header>
        <div className='image-container-product'>
          <img src={product_image} alt={`P_${product_image}`} className="ProductImg"/>
        </div>
        <div className='info-container-product'>
          <div className='wishlist' onClick={() => handleClick()}>
            <IoIosHeart size="34" color={wish ? "#EA374B" : "#9394A9"}/>
          </div>
          <div className='InfoProductDiv'>
            <h2>Stock: {stock <= 10 
                        ? "Less than 10" 
                        : stock === 0 
                        ? "Out of stock" 
                        : stock}
            </h2>
              <h2>Price: ${price}</h2>
              <button onClick={() => hanldeAddToCartDetail()} className="addToCartButton">Add to cart</button>
              <button onClick={() => user && verificated ? handleBuy() : handleNotUser()} className="BuyProductDetailButton">Buy</button>
            <div className='BuyAndAddButtons'>
            </div>
          </div>
        </div>
      </header>
      <h2 className='DescriptionProduct'>Description: </h2>
      <p>{description}</p>
    </div>
  )
};

export default ProductDetail;