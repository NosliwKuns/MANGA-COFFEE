import { useContext } from "react";
import { ProductContext } from "../../context/productContex";

const useProductContext = () => {
  
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error("useMangaContext was used outside of its Provider")
  }

  return context;
};

export default useProductContext;