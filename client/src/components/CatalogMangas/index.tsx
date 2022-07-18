import Cards from "./Cards";

type Props = {
  res: object;
  // query: string;
  // genre: string;
  // setPage: React.Dispatch<React.SetStateAction<number | string>>;
  // setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
}

const CatalogMangas = ({ res } : Props) => {
  return (
    <div className="five">
      <Cards
        res={res}
      />
    </div>
  )
};

export default CatalogMangas;