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
import { BsFillFilePersonFill } from "react-icons/bs"
import { useState } from 'react';
import User from '../User/User';
import { useLocation } from "react-router-dom";
import useIsActive from '../../app/customHooks/useIsActive'

type Props = {
    setPageShop: any;
    setGenreShop: any;
    setQueryShop: any;
    setColorF: any;
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({setPageShop, setGenreShop, setQueryShop, setColorF, isActive, setIsActive}: Props ) =>{

    const { pathname, search } = useLocation();


    return(
        <div className={isActive ? "four side-bar-container is-active " : "four side-bar-container"}>
            
            <div className="logo">
                {/* <span onClick={minSidebar}>a</span> MANGACOFFEE */}
                {/* <img src="https://res.cloudinary.com/dbqlsilt2/image/upload/v1658858831/a/sin_fondo_blanco_cd6rtl.png" alt="" /> */}
            </div>
            <User />
            <div className="side-wrapper">
                <div className="side-title">MENU</div>
                <div className="side-menu">
                    <Link to='/' onClick={() => setIsActive(!isActive)} className="">
                        <IoMdHome 
                            size={25}
                            color={'#fff'}
                        /> 
                        Home
                    </Link>
                    <Link to='/shop' onClick={() => setIsActive(!isActive)} className="">
                        <IoStorefront
                            size={20}
                            color={'#fff'}
                        />
                        <span onClick={() => {
                            if(pathname === '/shop' && search) {
                                setGenreShop('All');
                                setColorF([]);
                                setPageShop(1);
                                setQueryShop('')
                            }
                            }}>Shop</span>
                    </Link>
                    <Link to='/aboutUs' onClick={() => setIsActive(!isActive)}>
                        <BsFillFilePersonFill
                        size={20}
                        color={'#fff'}
                        />
                        About Us
                    </Link>
                    <button onClick={() =>setIsActive(!isActive)}>x</button>
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