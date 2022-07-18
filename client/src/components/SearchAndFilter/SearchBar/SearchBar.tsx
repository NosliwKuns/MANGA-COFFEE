import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { createSearchParams, useNavigate } from "react-router-dom";
import '../../../scss/SearchAndFilter/SearchBar.scss';

type Props = {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<string | number>>;
}
const SearchBar = ({ setQuery, setPage } : Props) => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    }
    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
        e.preventDefault();
        setQuery(input);
        setPage((prev : any) : any => {
            console.log((prev = 1), "aqui");
            const params : any = { q: input, page: prev };
            // navigate({
            //   pathname: "/",
            //   search: `?${createSearchParams(params)}`
            // });
            window.location.replace(`/mangas?${createSearchParams(params)}`)
          });
        setInput('');
    }

    return (
        <div className="search-container">
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
        </div>
    )
}

export default SearchBar