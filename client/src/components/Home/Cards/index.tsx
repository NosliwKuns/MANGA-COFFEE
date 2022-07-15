import '../../../scss/Home/Cards.scss';
import { Link } from 'react-router-dom';
import { motion, AnimateSharedLayout } from 'framer-motion'
import { gridAnimation, cardAnimation, h3Animation } from './../../../Animation.js';

/* interface Manga {
  data: any;
} */

type Props = {
  res: any;
}

const Cards = ({ res }: Props) => {

    const info = res.data
    const load = Array(12).fill(0)

    let display;
    if(res.isLoading) {
      display = load.map(e => {
        return (
          <div>
            <section></section>
            <header>Loading</header>
          </div>
        )
      })
    } else {
      display = info?.mangas.map((e : any)=> {
        return (
            
          <Link to={`/detail/${e._id}`}>
              <motion.div
                variants={cardAnimation}
                /* animate='show' */
                /* exit='hide' */
                /* animate={{ opacity : 1, scale: 1 }} 
                initial={{ opacity : 0}} 
                exit={{ opacity : 0, scale: 0  }}
                transition={{ duration: .5}} */

                layout>
              <section>
                <img src={`${e.cover_image}`} alt={`cover_page_${e._id}`} />
              </section>
              <motion.header /* variants={h3Animation} animate='show' exit='hide' */>{e.title}</motion.header>
              </motion.div>
          </Link>
            
        )
      }) 
    }

    return (
      <motion.div
        variants={gridAnimation}
        animate='show'
        exit='hide'
        /* layout  */
        className="cards-container">
        <AnimateSharedLayout>
          { display }
        </AnimateSharedLayout>
      </motion.div>
    )
};

export default Cards;