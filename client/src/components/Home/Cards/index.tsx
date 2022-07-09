import {fetchAllManga} from '../../../features/manga/mangaSlice'
import {useAppDispatch ,useAppSelector} from '../../../app/hooks'
import {useEffect} from 'react'
import '../../../scss/Home/Cards.scss'
import { Link } from 'react-router-dom'

const Cards = () => {
    const {mangas} = useAppSelector(state => state.mangas)
    const dispatch = useAppDispatch()
    useEffect (()=>{
      dispatch(fetchAllManga())
    },[dispatch])

    return (
      <div className="cards-container">
        {
          mangas.map(e=> {
            return (
              <Link to={`/detail/${e._id}`}>
                <div key={e._id}>
                <section>
                  <img src={`${e.cover_image}`} alt={`cover_page_${e._id}`} />
                </section>
                <header>{e.title}</header>
                {/* <ul>
                    {
                        e.genres.map( (genre:string , i :number) => (<li 
                          key={`${e.title} ${i}`}>{genre}</li>))
                    }
                </ul> */}
                </div>
              </Link>
            )
          })    
        }
      </div>
    )
}

export default Cards