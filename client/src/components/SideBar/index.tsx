import { Link } from "react-router-dom";
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { IoStorefront } from 'react-icons/io5'
import { AiTwotoneAppstore } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { GoFlame } from "react-icons/go";
import { RiHistoryLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import PopularMangas from "../RightSide/PopularMangas";
import '../../scss/RightSide/SideBar.scss';
import { GiHamburgerMenu } from "react-icons/gi"
import { useState } from 'react';
import User from '../User/User';

const SideBar = () =>{
    const [transform, setTransform] = useState<boolean>(false);
    const minSidebar = () => {
        setTransform(!transform);
    }

    return(
        <div className={transform ? "four side-bar-container is-active " : "four side-bar-container"}>
            
            <div className="logo">
               <span onClick={minSidebar}>a</span> MANGACOFFEE
            </div>
            <User />
            <div className="side-wrapper">
                <div className="side-title">MENU</div>
                <div className="side-menu">
                    <Link to='/' className="">
                        <IoMdHome 
                            size={25}
                            color={'#fff'}
                        /> 
                        Home
                    </Link>
                    <Link to='/shop' className="">
                        <IoStorefront
                            size={20}
                            color={'#fff'}
                        />
                        Shop
                    </Link>
                </div>
                
            </div>
            
            {/* <div onClick={minSidebar}>
                <GiHamburgerMenu
                    size={31}
                    color={'#fff'}
                />
            </div> */}
            

            {/* <div className="icons popular">
                <GoFlame
                    size={26}
                    color={'#fff'}
                />
                <h2>Popular</h2>
            </div> */}
            {/* {
                transform ? <div className="cap"><PopularMangas /></div> : ""
            } */}
            
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