/* import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hooks";
import { fetchMangaSortByName, fetchMangaSortByRating } from "../../../features/manga/mangaSlice";
 */
type Props = {
    setAlph: React.Dispatch<React.SetStateAction<string>>;
    setRate: React.Dispatch<React.SetStateAction<string>>;
}

const Sort = () => {
    /* const dispatch = useAppDispatch(); */
    // const useSelector = (state => state.mangas);

    const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        /* if(e.target.value === "name=1" || e.target.value === "name=-1") {
            dispatch(fetchMangaSortByName(e.target.value));
        }
        if(e.target.value === "rating=1" || e.target.value === "rating=-1") {
            dispatch(fetchMangaSortByRating(e.target.value));
        } */
        const { value } = e.target
        value === "alph +" ? setAlph("1") : value === "alph -" ? setAlph("-1") : '';
        value === "rate +" ? setRate("-1") : value === "rate -" ? setRate("+1") : '';
        console.log(e.target);
    };

    return (
        <div>
            <select defaultValue={"default"} onChange={(e) => handleChangeSort(e)} >
                <option value="default" >Sort By</option>
                <option value="alph +" >Name A-Z</option>
                <option value="alph -">Name Z-A</option>
                <option value="rate +">Most rated</option>
                <option value="rate -">Least rated</option>
            </select>
            <option value="default" >Sort By</option>

        </div>
    )
}

export default Sort;