import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom'


const UserButtons = () =>{
    return(
        <div>
            <span>
                <Link to='/user/fav'><span><IoIosHeart /></span></Link>
            </span>
            <span>
                <Link to='/user/wishlist'><span><BsBagCheckFill /></span></Link>
            </span>
            <span>
                <Link to='/user/cart'><span><FaShoppingCart /></span></Link>
            </span>
        </div>
    )
}

export default UserButtons;
