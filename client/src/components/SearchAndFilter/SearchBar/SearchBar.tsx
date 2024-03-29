import { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import '../../../scss/SearchAndFilter/SearchBar.scss';
import { MangaContext } from '../../../context/mangaContex';
import useMangaContext from "../../../app/customHooks/useMangaContext";
import useProductContext from "../../../app/customHooks/useProductContex";

type Props = {
    /* setQuery: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<string | number>>; */
    /* setQueryShop: any */
    /* res: any */
    /* resShop: any */
}
const SearchBar = ({ /* setQuery, */ /* setPage,  *//* setQueryShop, */ /* res, */ /* resShop  */} : Props) => {
    const { setQuery, setPage } : any = useMangaContext();
    const { setQueryShop, setPageShop } : any = useProductContext();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const { pathname } = useLocation()

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    }
    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery(input);
        setPage((prev : any) : any => {
            console.log((prev = 1), "aqui");
            setPage(prev)
            const params : any = { q: input, page: prev };
            navigate({
                pathname: "/mangas",
                search: `?${createSearchParams(params)}`
            });
        });
        setInput('');
    }
    
    const handleInputSubmitShop = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
        e.preventDefault();
        setQueryShop(input);
        setPageShop((prev : any) : any => {
            console.log((prev = 1), "aqui");
            const params : any = { q: input, page: prev };
            navigate({
                pathname: "/shop",
                search: `?${createSearchParams(params)}`
            });
        });
        setInput('');
    }

    return (
        <div className="search-container">
            {pathname === "/shop" ? 
                <form onSubmit={(e) => handleInputSubmitShop(e)}>
                    <input
                        name="search"
                        type="text"
                        value={input}
                        onChange ={(e) => handleInputChange(e)}
                        placeholder="Search products"
                    />
                    <button type="submit">
                        <FaSearch 
                            size={15}
                            color={'#EA374B'}
                        />
                    </button>
                </form>
                :
                <form onSubmit={(e) => handleInputSubmit(e)}>
                    <input
                        name="search"
                        type="text"
                        value={input}
                        onChange ={(e) => handleInputChange(e)}
                        placeholder="Search mangas"
                    />
                    <button type="submit">
                        <FaSearch 
                            size={15}
                            color={'#EA374B'}
                        />
                    </button>
                </form>
            }
        </div>
    )
}

export default SearchBar