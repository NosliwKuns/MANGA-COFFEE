import '../../../scss/Home/Pagination.scss'

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number | string>>;
    setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
    res: any;
    query: string;
    genre: string;
}

const Pagination = ({ res, setPage, setSearchParams, query, genre }: Props) =>{
    const info = res.data;
    const pages = Array(info?.totalPages).fill(0)

    const handleClick = (e: number) =>{
        setPage(e);
        if (query) {
          setSearchParams({
            q: query,
            page: e
          });
        }
        if (genre) {
          setSearchParams({
            page: e,
            genre: genre
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