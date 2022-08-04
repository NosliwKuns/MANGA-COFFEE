import { Link, useNavigate } from "react-router-dom";
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { IoStorefront } from 'react-icons/io5'
import { AiTwotoneAppstore } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { GoFlame } from "react-icons/go";
import { RiHistoryLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import PopularMangas from "../RightSide/PopularMangas";
import '../../scss/RightSide/SideBar.scss';
import { GiAnnexation, GiHamburgerMenu } from "react-icons/gi"
import { BsFillFilePersonFill } from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"
import { useState } from 'react';
import User from '../User/User';
import { useLocation } from "react-router-dom";
import useIsActive from '../../app/customHooks/useIsActive'
import useProductContext from "../../app/customHooks/useProductContex";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOut, logOutUser } from "../../features/user/userSlice";

type Props = {
    /* setPageShop: any;
    setGenreShop: any;
    setQueryShop: any; */
    /* setColorF: any; */
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({/* setPageShop, setGenreShop, setQueryShop, */ /* setColorF, */ isActive, setIsActive}: Props ) =>{

    const { pathname, search } = useLocation();
    const { setCategory, setPageShop, setQueryShop } : any = useProductContext();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { email } = useAppSelector(state => state.user);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const btnLogOut = async () => {
        navigate("/", { replace: true });
        try {
          await dispatch(logOutUser());
          await dispatch(logOut());
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <div className={isActive 
             ? "four side-bar-container is-active " 
             : "four side-bar-container"}
        >
            <div className="logo">
            </div>
            <User />
            <div className="side-wrapper">
                <div className="side-title">MENU</div>
                <div className="side-menu">
                    <Link to='/' 
                        onClick={handleClick}
                        className={pathname === '/' ? "color-link" : ""}>
                        <IoMdHome 
                            size={25}
                            color={'#9394A9'}
                        /> 
                        Home
                    </Link>
                    <Link to='/shop'
                        onClick={handleClick}
                        className={pathname === '/shop' ? "color-link" : ""}>
                        <IoStorefront
                            size={20}
                            color={'#9394A9'}
                        />
                        <span onClick={() => {
                            if(pathname === '/shop' && search) {
                                setCategory('All');
                                setPageShop(1);
                                setQueryShop('')
                            }
                            }}>Shop</span>
                    </Link>
                    <Link to='/aboutUs'
                        onClick={handleClick}
                        className={pathname === '/aboutUs' ? "color-link" : ""}>
                        <BsFillFilePersonFill
                        size={20}
                        color={'#9394A9'}
                        />
                        About Us
                    </Link>
                </div>
            </div>
            
                {
                    email ?
                     <div className="log-out-btn">
                        <span onClick={btnLogOut}
                        >Log Out<BiLogOut size={30}/>
                        </span>
                    </div>  : ''
                }
                
            
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