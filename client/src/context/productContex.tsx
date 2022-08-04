import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../app/customHooks/useFetch";
import useLocalStorage from "../app/customHooks/useLocalStorage";
import { ProductContextType } from '../Interfaces/products';

const ProductContext = createContext<ProductContextType | null>(null);

const ProductContextProvider = ({ children } : any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colorFShop, setColorFShop] = useLocalStorage('colorFShop', [])
  const [pageShop, setPageShop] = useState<any>(searchParams.get("page") || 1);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [queryShop, setQueryShop] = useState(searchParams.get("q") || "");
  const [shopSort, setshopSort] = useState<string>(searchParams.get("sort") || "");
  const [product, setProduct] = useLocalStorage('test', []);

  const resShop = useFetch(
    queryShop || pageShop || category 
    ? `/products?limit=12&search=${queryShop}&page=${pageShop}&category=${category}&sort=${shopSort}` 
    : ""
  );

  return (
    <ProductContext.Provider value={{
      colorFShop,
      setColorFShop,
      pageShop,
      setPageShop,
      category,
      setCategory,
      queryShop,
      setQueryShop,
      shopSort,
      setshopSort,
      resShop,
      product,
      setProduct,
      setSearchParams
    }}>
      {children}
    </ProductContext.Provider>
  )
};

export { ProductContext, ProductContextProvider };