import {fetchAllManga} from '../../../features/manga/mangaSlice';
import {useAppDispatch ,useAppSelector} from '../../../app/hooks';
import {useEffect} from 'react';
import '../../../scss/Home/Cards.scss';
import { Link } from 'react-router-dom';

type Props = {
  docs: Array<any>;
}

const Cards = ({ docs }: Props) => {
    /* console.log(docs, 'sera cierto');
    const {mangas} = useAppSelector(state => state.mangas)
    const dispatch = useAppDispatch() */
    /* console.log(mangas, 'seraaaaaaaa')
    useEffect (()=>{
      dispatch(fetchAllManga())
    },[dispatch]) */

    return (
      <div className="cards-container">
        {
         docs?.map(e=> {
            return (
              <Link to={`/detail/${e._id}`}>
                <div key={e._id}>
                <section>
                  <img src={`${e.cover_image}`} alt={`cover_page_${e._id}`} />
                </section>
                <header>{e.title}</header>
                </div>
              </Link>
            )
          })    
        }
      </div>
    )
}

export default Cards