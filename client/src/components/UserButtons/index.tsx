import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { useState } from 'react';
import ShoppingCard from "../ShoppingCard";
import '../../scss/Shop/ShoppingCard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FetchGetCart } from '../../features/user/userSlice'
import useHeaders from "../../app/headers";

type Props = {
    setProduct: React.Dispatch<React.SetStateAction<any>>;
    product: any
}

const UserButtons = ({ setProduct, product }: Props) =>{
    const dispatch = useAppDispatch()
    const { id, token } = useAppSelector(state => state.user)
    const headers = useHeaders(token)
    const [open, setOpen] = useState<boolean>(false)
    
    const openShoppingCart = () => {
        setOpen(!open)
        dispatch(FetchGetCart(id, headers))
    }
    
    return(
        <div className="user-buttons">
            <ShoppingCard 
                open={open}
                setOpen={setOpen}
                product={product} 
                setProduct={setProduct} 
            />
            <span>
                <Link to='/user/fav'><span><IoIosHeart size={28} color={'#9394A9'} /></span></Link>
            </span>
            <span>
                <Link to='/user/wishlist'><span><BsBagCheckFill size={25} color={'#9394A9'} /></span></Link>
            </span>  
            <span onClick={openShoppingCart}>
                <FaShoppingCart size={26} color={'#9394A9'} />
            </span>
            <div 
                className={open ? "overlay" : "hidden-overlay"}
                onClick={openShoppingCart}
            ></div>
        </div>
    )
}

export default UserButtons;
