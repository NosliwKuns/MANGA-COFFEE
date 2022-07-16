import { Link } from "react-router-dom";
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { IoStorefront } from 'react-icons/io5'
import { AiTwotoneAppstore } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { GoFlame } from "react-icons/go";
import { RiHistoryLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import '../../../scss/RightSide/SideBar.scss';

const SideBar = () =>{

    return(
        <div className="side-bar-container">
            <Link to='/'>
                <IoMdHome 
                    size={31}
					color={'#9394A9'}
                /> 
                <h2>Home</h2>
            </Link>
            <Link to='/categories'>
                <AiTwotoneAppstore 
                    size={30}
					color={'#9394A9'}
                />
                <h2>Categories</h2>
            </Link>
            <Link to='/newreleases'>
                <MdLibraryBooks
					size={30}
					color={'#9394A9'}
				/>
                <h2>New Releases</h2>
            </Link>
            <Link to='/popular'>
                <GoFlame
					size={30}
					color={'#9394A9'}
				/>
                <h2>Popular</h2>
            </Link>
            <Link to='/shop'>
                <IoStorefront
					size={28}
					color={'#9394A9'}
				/>
                <h2>Shop</h2>
            </Link>
            <Link to='/history'>
                <RiHistoryLine
					size={30}
					color={'#9394A9'}
				/>
                <h2>History</h2>
            </Link>
        </div>
    )
}

export default SideBar;