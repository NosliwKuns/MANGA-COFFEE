import '../../scss/Shop/ShoppingCard.scss';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FetchAddCart, FetchModifyCart, FetchDeleteCart, FetchGetCart, fetchCleanCart } from '../../features/user/userSlice'
import "../../scss/Details/Detail.scss";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import useHeaders from "../../app/headers";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
}

const ShoppingCard = ({ open, setOpen, setProduct, product } : Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, id, verificated, cart, token } = useAppSelector(state => state.user)
  console.log("CAAAAAAAAAAAART", cart);
  const headers = useHeaders(token)
  const getLocal : any = localStorage.getItem('test');
  const parsLocal = JSON.parse(getLocal);
  console.log(product);

  useEffect(() => {
    dispatch(FetchGetCart(id, headers))
  }, [dispatch])
  
  const handleChangeQuantity = (productId: string, quantity: number) => {
    dispatch(FetchModifyCart(id, productId, quantity, headers))
  }
  
  const handleDeleteProduct = (productId: string) => {
    dispatch(FetchDeleteCart(productId, headers))
  }


  // const deleteProduct = (id : any) => {
  //   const remove = product.filter((e : any)=> e.id !== id);
  //   setProduct(remove);
  //   console.log(remove);
  // };

  // const addquantity = (id : any) => {
  //   const findProduct = product.find((e : any)=> e.id === id);
  //   findProduct.quantity =  findProduct.quantity + 1;
  //   console.log(findProduct);
  //   setProduct([...product]);
  // };

  // const sustractquantity = (id : any) => {
  //   const findProduct = product.find((e : any)=> e.id === id);
  //   if(findProduct.quantity > 1)
  //   findProduct.quantity =  findProduct.quantity -1;
  //   setProduct([...product]);
  // }

  // console.log(product);
  // const arrQuantity = product && product.map((e: any) => e.quantity);
  // const totalQuantity = arrquantity ? arrquantity.reduce((a : number, b : number) => a + b, 0 ) : '';
  // console.log(arrquantity)  
  
  const handleBuyAll = () => {
    if(user && verificated) {
      navigate("/shoppingTime")
    } else if(user && !verificated){
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
    } else if(!user) {
      navigate("/registration")
    }
  }
  
  
  return (
    <div 
      className="shopping-card-container"

    >
      <div 
        className='shopping-card-outer'
        /* onClick={() => {
          setOpen(!open);
          console.log(open);
        }} */
      >

      </div>
      <motion.div 
        className={open ? "shopping-card" : 'shopping-card active'}
        transition={ {duration : .5}}
      >
        {/* <button onClick={() => setOpen(!open)}>fff</button> */}
        <h2>Total quantity: {/* {totalQuantity} */}</h2>
        {
          cart?.map((e : any) => {
            return (
              <div>
                <img src={e.product_image} alt={e.product_image} />
                <h3>Quantity: {e.quantity}</h3>
                <button onClick={() => handleChangeQuantity(e._id, -1)} style={{height: "30px", width: "30px"}}>-</button>
                <button onClick={() => handleDeleteProduct(e._id)} style={{height: "30px", width: "60px"}}>remove</button>
                <button onClick={() => handleChangeQuantity(e._id, 1)} style={{height: "30px", width: "30px"}}>+</button>
              </div>
            )
          })
        }
        <button onClick={() => {
          dispatch(fetchCleanCart())
          // setProduct([])
          // window.localStorage.setItem("test", JSON.stringify(""));
        }}>Clear Cart</button>
        {/* <Link to={"/shoppingTime"}> */}
        <button onClick={() => handleBuyAll()}>Buy All</button>
        {/* </Link> */}
        
      </motion.div>
    </div>
  )
};

export default ShoppingCard;