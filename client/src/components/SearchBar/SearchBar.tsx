import React, { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { GoSearch } from "react-icons/go"
import { fetchMangaByName } from "../../features/manga/mangaSlice"

const SearchBar = () => {
    const dispatch = useAppDispatch()
    const [input, setInput] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    }
    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchMangaByName(input));
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