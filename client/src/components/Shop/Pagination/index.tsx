import '../../../scss/Home/Pagination.scss'

type Props = {
    setPageShop: React.Dispatch<React.SetStateAction<number | string>>;
    setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
    queryShop: string;
    genreShop: string;
    resShop: any
}

const Pagination = ({ setPageShop, setSearchParams, queryShop, genreShop, resShop }: Props) =>{
    const infoShop = resShop.data
    const pages = Array(infoShop?.totalPages).fill(0)

    const handleClick = (e: number) =>{
        setPageShop(e);
        if (queryShop) {
          setSearchParams({
            q: queryShop,
            page: e
          });
        }
        if (genreShop) {
          setSearchParams({
            page: e,
            genre: genreShop
          });
        } else {
          setSearchParams({
            page: e
          });
        }
      };
    return(
        <div className='btn'>
            {pages?.map((_, index) =>(
                
                <span >
                    <button onClick={() => handleClick(index+1)}>{index +1}</button>
                </span>
            ))}
        </div>
    )
};

export default Pagination;