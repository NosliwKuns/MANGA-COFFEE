import { Link } from "react-router-dom";
import { IoHomeOutline } from 'react-icons/io5'
import { MdOutlineStorefront } from 'react-icons/md'


const SideBar = () =>{
    return(
        <div>
            <Link to='/'><p> <IoHomeOutline /> Home</p></Link>
            <Link to='/store'><p> <MdOutlineStorefront /> Store</p></Link>
        </div>
    )
}

export default SideBar;