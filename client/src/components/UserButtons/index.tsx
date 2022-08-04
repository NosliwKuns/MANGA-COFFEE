import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { useState } from 'react';
import ShoppingCard from "../ShoppingCard";
import '../../scss/Shop/ShoppingCard.scss';
import useProductContext from "../../app/customHooks/useProductContex";

type Props = {
    /* setProduct: React.Dispatch<React.SetStateAction<any>>;
    product: any */
    setClickBuy: any
}

const UserButtons = ({ /* setProduct, product, */ setClickBuy }: Props) =>{
    const [open, setOpen] = useState<boolean>(false);
    const { product } : any = useProductContext();

    const arrAmount = product && product.map((e: any) => e.amount);
    const totalAmount = arrAmount ? arrAmount.reduce((a : number, b : number) => a + b, 0 ) : '';

    const openShoppingCart = () => {
        setOpen(!open)
    }
    return(
        <div className="user-buttons">
            <ShoppingCard 
                open={open}
                setOpen={setOpen}
                /* product={product} 
                setProduct={setProduct}  */
                setClickBuy={setClickBuy}
            />
            <span>
                <Link to='/user/fav'><span><IoIosHeart size={28} color={'#9394A9'} /></span></Link>
            </span>
            <span>
                <Link to='/user/wishlist'>
                    <span>
                        <BsBagCheckFill size={25} color={'#9394A9'} />
                    </span>
                </Link>
            </span>  
            <span 
                className={"shopping-cart-icon"}
                onClick={openShoppingCart}>
                <FaShoppingCart size={26} color={'#9394A9'} />
                <div className={totalAmount < 1 ? "hide-count" : 'show-count'}>
                    {totalAmount}
                </div>
            </span>
            <div 
                className={open ? "overlay" : "hidden-overlay"}
                onClick={openShoppingCart}
            ></div>
        </div>
    )
}

export default UserButtons;
