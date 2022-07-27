import { Link } from 'react-router-dom';
import '../../../scss/Shop/ProductCards.scss';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaShoppingCart } from "react-icons/fa";
// import NotFound from '../../SearchAndFilter/NotFound/NotFound'
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { FetchAddCart } from '../../../features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import useHeaders from "../../../app/headers";


type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
  resShop: any
  genreShop: any
}

const CardsProduct = ({ setProduct, product, resShop, genreShop }: Props) => {
  const dispatch = useAppDispatch()
  const { id, token } = useAppSelector(state => state.user)
  const headers = useHeaders(token)

  const handleAddToCart = (productId: string) => {
    dispatch(FetchAddCart(id, productId, 1, headers))
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

  // const addToCard : any = (a : any, b: any, c: any) => {
  //   let order = {
  //     product_image : a,
  //     price: b,
  //     id : c,
  //     amount: 1
  //   }
    
    // if (!product) {
    //   setProduct([order])
    // } else {
    //   const add = product.find((e : any) => e.id === order.id)
    //   if(!add) setProduct([order, ...product]);
    // }
  // }
  
  
  return (
    <div className='product-container'>
        {resShop.data?.products.length ?
      <div className="container">
        <div className="product-grid">
        <Link 
          to={`/product/${resShop.data?.products.length > 1 && resShop.data?.products[0]._id}`} 
          className="card stacked featured">
            <img src={resShop.data?.products.length > 1 &&  resShop.data?.products[0].product_image} alt="product-img" className="card__img"/>
            <div className="card__content">
              <h2 className="card__title">{resShop.data?.products.length > 1 &&  resShop.data?.products[0].name}</h2>
                  <p>{resShop.data?.products.length > 1 &&  resShop.data?.products[0].stock <= 10 
                  ? "Less than 10" 
                  : resShop.data?.products.length > 1 &&  resShop.data?.products[0].stock === 0 
                  ? "Out of stock" 
                  : "Available"}
                  </p>
              <p className="card__price">${resShop.data?.products.length > 1 &&  resShop.data?.products[0].price}</p>
              <button onClick={() => handleAddToCart(resShop.data?.products.length > 1 && resShop.data?.products[0]._id)}>Add to cart</button>
          </div>
        </Link>
        <>
        {resShop.data?.products.slice(1).map((e : any) => {
            return (
              <div className="card stacked">
              <Link to={`/product/${e._id}`}>
                  <img src={e.product_image} alt="product-img" className="card__img"/>
                </Link>
                <div className="card__content">
                  <h2 className="card__title">{e.name}</h2>
                  <p>{e.stock <= 10 
                  ? "Less than 10" 
                  : e.stock === 0 
                  ? "Out of stock" 
                  : "Available"}
                  </p>
                  <p className="card__price">${e.price}</p>
                  <button onClick={() => handleAddToCart(e._id)}>Add to cart</button>
                </div>
              </div>
            )
          })
        }
          
        </>
          </div>

    </div>
    : <div className="NotSearchFoundProducts">
    <BsFillInfoCircleFill size={55}/>
    <h1>No Products found for your search.</h1>
    <h3>Try searching for another one</h3>
    </div>}
    </div>
  )
};

export default CardsProduct;