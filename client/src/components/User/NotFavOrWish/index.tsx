import { useLocation, useNavigate } from "react-router-dom";
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import '../../../scss/User/Favorites.scss';

const NotFavOrWish = () =>{
    const {pathname} = useLocation();
    const navigate = useNavigate();
    
    return(
        <section className="notFavOrWish">
            {
                pathname === '/user/wishlist'
                ?
                <>
                <BsFillInfoCircleFill size={55}/>
                <h1>You have no Products in your wishlist.</h1>
                <h3>Looking for your favorites Products?</h3>
                <Link to='/shop'><button className="addButton">Add some!</button></Link>
                </>
                :
                pathname === "/user/fav" 
                ? 
                <>
                <BsFillInfoCircleFill size={55}/>
                <h1>You have no Manga in favorites.</h1>
                <h3>Looking for your favorites Mangas?</h3>
                <button className="addButton" onClick={()=>navigate('/mangas', { replace: true })}>Add some!</button>
                </>
                :
                ''
            }
            
        </section>
    )
}

export default NotFavOrWish;