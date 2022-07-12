import { Link } from "react-router-dom";
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { IoStorefront } from 'react-icons/io5'
import { AiTwotoneAppstore } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { GoFlame } from "react-icons/go";
import { RiHistoryLine } from "react-icons/ri";
import { useAppDispatch } from "../../app/hooks";
import {fetchAllManga} from '../../features/manga/mangaSlice'



const SideBar = () =>{
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(fetchAllManga())
    }
    return(
        <div>
            <Link to='/'><p onClick={() => handleClick()}><BsFillHouseDoorFill /> Home</p></Link>
            <Link to='/categories'><p><AiTwotoneAppstore /> Categories</p></Link>
            <Link to='/newreleases'><p><MdLibraryBooks/> New Releases</p></Link>
            <Link to='/popular'><p><GoFlame/> Popular</p></Link>
            <Link to='/store'><p><IoStorefront/> Store</p></Link>
            <Link to='/history'><p><RiHistoryLine/> History</p></Link>
        </div>
    )
}

export default SideBar;