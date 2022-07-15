import { useEffect, useState } from "react"
/* import { useAppDispatch } from "../../../app/hooks" */
import { GoSearch } from "react-icons/go"
import { useSearchParams } from "react-router-dom";
import History from "../../History";
/* import { fetchMangaByName } from "../../../features/manga/mangaSlice" */

type Props = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar = ({ setSearch } : Props) => {
    /* const dispatch = useAppDispatch() */
    const [input, setInput] = useState("");
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log(params, 'params');
        const q = params.get('q');
    },[]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    }
    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* dispatch(fetchMangaByName(input)); */
        setSearch(input);
        setParams({
            q: input
        })
        History.push('/search')
        setInput('');
    }

    return (
        <div>
            <form onSubmit={(e) => handleInputSubmit(e)}>
                <input
                    name="search"
                    type="text"
                    value={input}
                    onChange ={(e) => handleInputChange(e)}
                    placeholder="Search..."
                />
                <button type="submit">
                    <GoSearch />
                </button>
            </form>
        </div>
    )
}

export default SearchBar