import { useLocation, useNavigate } from "react-router-dom";
import { BsFillInfoCircleFill } from 'react-icons/bs';
import '../../../scss/Home/Cards.scss';

const NotFound = () =>{
    const {pathname} = useLocation()
    
    return(
        <section className= {pathname === '/mangas' ? "NotSearchFoundMangas" : "NotSearchFoundProducts"}>
                {
                pathname === '/mangas'
                ?
                <>
                <BsFillInfoCircleFill size={55}/>
                <h1>No Mangas found for your search.</h1>
                <h3>Try searching for another one</h3>
                </>
                :
                pathname === "/shop" 
                ? 
                <div className="NotSearchFoundProducts">
                <BsFillInfoCircleFill size={55}/>
                <h1>No Products found for your search.</h1>
                <h3>Try searching for another one</h3>
                </div>
                :
                ''
            }
        </section>
    )
}

export default NotFound;