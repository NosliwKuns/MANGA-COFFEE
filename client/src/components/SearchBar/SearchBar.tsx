import React, { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { GoSearch } from "react-icons/go"
import { searchMangaByName } from "../../features/manga/mangaSlice"

const SearchBar = () => {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    }
    const handleInputSubmit = (e: any) => {
        e.preventDefault();
        dispatch(searchMangaByName(input));
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
            </form>
            <button type="submit">
                <GoSearch />
            </button>
        </div>
    )
}

export default SearchBar