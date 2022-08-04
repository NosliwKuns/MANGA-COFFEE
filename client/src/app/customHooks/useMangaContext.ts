import { useContext } from "react";
import { MangaContext } from "../../context/mangaContex";

const useMangaContext = () => {
  
  const context = useContext(MangaContext);

  if (context === undefined) {
    throw new Error("useMangaContext was used outside of its Provider")
  }

  return context;
};

export default useMangaContext;