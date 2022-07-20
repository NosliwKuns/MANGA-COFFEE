import { Link } from "react-router-dom";
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { IoStorefront } from 'react-icons/io5'
import { AiTwotoneAppstore } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { GoFlame } from "react-icons/go";
import { RiHistoryLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import PopularMangas from "./PopularMangas";
import '../../../scss/RightSide/SideBar.scss';
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from 'react';

const SideBar = () =>{
    const [transform, setTransform] = useState<boolean>(true);
    const minSidebar = () => {
        setTransform(!transform);
    }

    return(
        <div className={transform ? "four side-bar-container" : "hide"}>
            
            
            
            <div onClick={minSidebar}>
                <GiHamburgerMenu
                    size={31}
                    color={'#fff'}
                />
            </div>
            <Link to='/' className="icons">
                <IoMdHome 
                    size={31}
					color={'#fff'}
                /> 
                <h2>Home</h2>
            </Link>
            <Link to='/shop' className="icons">
                <IoStorefront
					size={28}
					color={'#fff'}
				/>
                <h2>Shop</h2>
            </Link>

            <div className="icons popular">
                <GoFlame
                    size={30}
                    color={'#fff'}
                />
                <h2>Popular</h2>
            </div>
            {
                transform ? <div className="cap"><PopularMangas /></div> : ""
            }
            
{/*             <Link to='/categories'>
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
            
            <Link to='/history'>
                <RiHistoryLine
					size={30}
					color={'#9394A9'}
				/>
                <h2>History</h2>
            </Link> */}
        </div>
    )
}

export default SideBar;