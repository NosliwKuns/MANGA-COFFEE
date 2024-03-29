import '../../../scss/Home/Cards.scss';
import { Link } from 'react-router-dom';
import { motion, AnimateSharedLayout } from 'framer-motion'
import { gridAnimation, cardAnimation, h3Animation } from '../../../Animation.js';

import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MangaContext } from '../../../context/mangaContex'
import { useContext } from 'react';
import Loader from './../../Loader/index';

type Props = {
  res: any;
}

const Cards = (/* { res }: Props */) => {

    const { res } : any = useContext(MangaContext) 

    const info = res.data
    const load = Array(12).fill(0)

    let display;
    if(res.isLoading) {
      display = <Loader />
    } else {
      display = info?.mangas.length ? info?.mangas.map((e : any)=> {
        return (
            
          <Link to={`/mangas/detail/${e._id}`}>
              <motion.div
                variants={cardAnimation}
                animate={{ opacity : 1, scale: 1 }} 
                initial={{ opacity : 0}} 
                exit={{ opacity : 0, scale: .6  }}
                layout>
              <section>
                <img src={`${e.cover_image}`} alt={`cover_page_${e._id}`} />
              </section>
              <motion.header className='CardsTitle'variants={h3Animation} animate='show' exit='hide'>{e.title}</motion.header>
              </motion.div>
          </Link>
            
        )
      }) 
      : <section className='NotSearchFoundMangas'>
      <BsFillInfoCircleFill size={55}/>
      <h1>No Mangas found for your search.</h1>
      <h3>Try searching for another one</h3>
      </section>
    }

    return (
      <div>
        <motion.div
          variants={gridAnimation}
          animate='show'
          exit='hide'
          /* layout  */
          className="cards-container">
          {/* <AnimateSharedLayout> */}
            { display }
          {/* </AnimateSharedLayout> */}
        </motion.div>
      </div>
    )
};

export default Cards;