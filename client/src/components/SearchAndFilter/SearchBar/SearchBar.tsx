import { useState } from "react"
/* import { useAppDispatch } from "../../../app/hooks" */
import { GoSearch } from "react-icons/go"
/* import { fetchMangaByName } from "../../../features/manga/mangaSlice" */

type Props = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setSearch } : Props) => {
    /* const dispatch = useAppDispatch() */
    const [input, setInput] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    }
    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* dispatch(fetchMangaByName(input)); */
        setSearch(input)
        setInput('');
    }

    return (
        <div>
            <form onSubmit={(e) => handleInputSubmit(e)}>
                <input
                    name="email"
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