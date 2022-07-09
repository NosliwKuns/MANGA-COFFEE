import {fetchAllManga} from '../../features/manga/mangaSlice'
import {useAppDispatch ,useAppSelector} from '../../app/hooks'
import {useEffect} from 'react'

const Cards = () => {
    const {mangas} = useAppSelector(state => state.mangas)
    const dispatch = useAppDispatch ()
    useEffect (()=>{
      dispatch(fetchAllManga())
    },[])
    console.log(mangas.length)
    console.log('hola')
    return (
      <div className="five">
        {
          mangas.map(e=><div key={e._id}>
            <header>{e.title}</header>
            <img src={`${e.cover_image}`} alt={`cover_page_${e._id}`} />
            <ul>
                {
                    e.genres.map( (genre:string , i :number) => (<li 
                      key={`${e.title} ${i}`}>{genre}</li>))
                }
            </ul>
            </div>)
        }
      </div>
    )
}

export default Cards