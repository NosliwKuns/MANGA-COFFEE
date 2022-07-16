import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom'


const UserButtons = () =>{
    return(
        <div>
            <span>
                <Link to='/user/fav'><span><IoIosHeart size={28} color={'#9394A9'} /></span></Link>
            </span>
            <span>
                <Link to='/user/wishlist'><span><BsBagCheckFill size={25} color={'#9394A9'} /></span></Link>
            </span>
            <span>
                <Link to='/user/cart'><span><FaShoppingCart size={26} color={'#9394A9'} /></span></Link>
            </span>
        </div>
    )
}

export default UserButtons;
