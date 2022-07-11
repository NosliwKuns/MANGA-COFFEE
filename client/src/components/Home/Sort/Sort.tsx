import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hooks";
import { fetchMangaSortByName, fetchMangaSortByRating } from "../../../features/manga/mangaSlice";

const Sort = () => {
    const dispatch = useAppDispatch();
    // const useSelector = (state => state.mangas);

    const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        if(e.target.value === "name=1" || e.target.value === "name=-1") {
            dispatch(fetchMangaSortByName(e.target.value));
        }
        if(e.target.value === "rating=1" || e.target.value === "rating=-1") {
            dispatch(fetchMangaSortByRating(e.target.value));
        }
    };

    return (
        <div>
            <select defaultValue={"default"} onChange={(e) => handleChangeSort(e)} >
                <option value="default">Sort By</option>
                <option value="name=1">Name A-Z</option>
                <option value="name=-1">Name Z-A</option>
                <option value="rating=-1">Most rated</option>
                <option value="rating=1">Least rated</option>
            </select>
        </div>
    )
}

export default Sort;