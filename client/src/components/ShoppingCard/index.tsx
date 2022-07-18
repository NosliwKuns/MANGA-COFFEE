import '../../scss/Shop/ShoppingCard.scss';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
}

const ShoppingCard = ({ open, setOpen, setProduct, product } : Props) => {
  const getLocal : any = localStorage.getItem('test');
  const parsLocal = JSON.parse(getLocal);
  console.log(product);

  useEffect(() => {

  }, [setProduct])

  const deleteProduct = (id : any) => {
    const remove = product.filter((e : any)=> e.id !== id);
    setProduct(remove);
    console.log(remove);
  };

  const addAmount = (id : any) => {
    const findProduct = product.find((e : any)=> e.id === id);
    findProduct.amount =  findProduct.amount + 1;
    console.log(findProduct);
    setProduct([...product]);
  };

  const sustractAmount = (id : any) => {
    const findProduct = product.find((e : any)=> e.id === id);
    if(findProduct.amount > 1)
    findProduct.amount =  findProduct.amount -1;
    setProduct([...product]);
  }

  console.log(product);
  const arrAmount = product && product.map((e: any) => e.amount);
  const totalAmount = arrAmount ? arrAmount.reduce((a : number, b : number) => a + b, 0 ) : '';
  console.log(arrAmount);
  
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
        <h2>Total Amount: {totalAmount}</h2>
        {
          product?.map((e : any) => {
            return (
              <div>
                <img src={e.product_image} alt={e.product_image} />
                <h3>Amount: {e.amount}</h3>
                <button onClick={() => sustractAmount(e.id)} style={{height: "30px", width: "30px"}}>-</button>
                <button onClick={() => deleteProduct(e.id)} style={{height: "30px", width: "60px"}}>remove</button>
                <button onClick={() => addAmount(e.id)} style={{height: "30px", width: "30px"}}>+</button>
              </div>
            )
          })
        }
        <button onClick={() => setProduct([])}>Clear Card</button>
      </motion.div>
    </div>
  )
};

export default ShoppingCard;