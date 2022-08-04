import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../app/customHooks/useFetch";
import useLocalStorage from "../app/customHooks/useLocalStorage";
import { MangaContextType } from '../Interfaces/mangas';

const MangaContext = createContext<MangaContextType | null>(null);

const MangaContextProvider = ({ children } : any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colorF, setColorF] = useLocalStorage('colorFM', [])
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState<any>(searchParams.get("page") || 1);
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "")
  
  const res = useFetch(
    query || page || genre 
    ? `/manga?limit=12&search=${query}&page=${page}&genres=${genre}&sort=${sort}` 
    : ""
  );

  return (
    <MangaContext.Provider value={{
      colorF, 
      setColorF, 
      query, 
      setQuery, 
      page, 
      setPage, 
      genre, 
      setGenre, 
      sort, 
      setSort, 
      res
    }}>
      {children}
    </MangaContext.Provider>
  )
};

export { MangaContext, MangaContextProvider };

