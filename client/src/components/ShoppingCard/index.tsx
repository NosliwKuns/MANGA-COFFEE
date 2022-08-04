import '../../scss/Shop/ShoppingCard.scss';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import '../../scss/Details/Comments.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import useProductContext from '../../app/customHooks/useProductContex';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /* setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any */
  setClickBuy: any
}

const ShoppingCard = ({ open, setOpen, /* setProduct, product, */ setClickBuy } : Props) => {
  const getLocal : any = localStorage.getItem('test');
  const parsLocal = JSON.parse(getLocal);
  const navigate = useNavigate()
  const { user, verificated } = useAppSelector(state => state.user);
  const { product, setProduct } : any = useProductContext();

  useEffect(() => {

  }, [setProduct])

  const deleteProduct = (id : any) => {
    const remove = product.filter((e : any)=> e._id !== id);
    setProduct(remove);
  };

  const addAmount = (id : any) => {
    const findProduct = product.find((e : any)=> e._id === id);
    if(findProduct.stock === findProduct.amount) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: (
          <>
            <h1>Not enough stock!</h1>
          </>
        ),
        position: "center",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        buttonsStyling: false,
        customClass: {
          confirmButton: "confirmButton",
        },
      }); 
    } else{
        findProduct.amount =  findProduct.amount + 1;
    } 
    setProduct([...product]);
  };

  const sustractAmount = (id : any) => {
    const findProduct = product.find((e : any)=> e._id === id);
    if(findProduct.amount > 1)
    findProduct.amount =  findProduct.amount -1;
    setProduct([...product]);
  }

  const arrAmount = product && product.map((e: any) => e.amount);
  const totalAmount = arrAmount ? arrAmount.reduce((a : number, b : number) => a + b, 0 ) : '';


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
  
  const HhandleShopBuyAlert = () => {
    navigate("/shop", { replace: true }) 
    setOpen(false)
  }
  
  const handleBuyCart = () => {
    if(parsLocal.length >= 1) {
      setClickBuy("cartBtn")
      navigate("/buyProduct")
      setOpen(false)
    } else {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><BsFillInfoCircleFill size={55}/> <h2>It seems you have no products in your cart</h2> <h3>Looking for your favorites Products?</h3></>,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        confirmButtonText:
        <div onClick={() => HhandleShopBuyAlert()} className="divSignIn">Add some!</div>,
        confirmButtonAriaLabel: 'Add some',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmButtonBUY'
        }
      })
    }
  }
  
  const handleClearCart = () => {
    setProduct([])
    setOpen(false)
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
        <h2>Total Quantity: {totalAmount}</h2>
        {
          product?.map((e : any) => {
            return (
              <div className='ProductTotalInfoContainer'>
                <div className='ImageSoppingCartContainer'>
                  <img src={e.product_image} alt={e.product_image} />
                </div>
                <div className='ProductInformationShoppingCart'>
                  <div className='NameAndQuantity'>
                    <h3>{e.name}</h3>
                    <h4>Quantity: {e.amount}</h4>
                  </div>
                  <div>
                    <button className="ButtonsInsideTheProduct" onClick={() => sustractAmount(e._id)} style={{height: "30px", width: "30px"}}>-</button>
                    <button className="ButtonsInsideTheProduct" onClick={() => deleteProduct(e._id)} style={{height: "30px", width: "60px"}}>remove</button>
                    <button className="ButtonsInsideTheProduct" onClick={() => addAmount(e._id)} style={{height: "30px", width: "30px"}}>+</button>
                  </div>
                </div>
              </div>
            )
          })
        }
        <div className='ButtonsOutside'>
          <button onClick={() => handleClearCart()} className="ButtonsOutsideTheProduct">Clear Cart</button>
          <button className="ButtonsOutsideTheProduct" onClick={() => user && verificated ? handleBuyCart() : handleNotUser()}>Buy All</button>
        </div>
        
      </motion.div>
    </div>
  )
};

export default ShoppingCard;