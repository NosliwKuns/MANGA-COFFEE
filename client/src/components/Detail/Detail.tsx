import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDetailManga, fetchCleanDetails } from "../../features/manga/mangaSlice";
import {FetchFavoriteMangas} from '../../features/user/userSlice';
import { useEffect} from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import '../../scss/Details/Detail.scss';
import Comments from "./Comments";
import { IoIosHeart } from "react-icons/io";
import useHeaders from "../../app/headers";
import { carAnimation, h3Animation } from "../../Animation";
import { motion } from "framer-motion"; 
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import useModal from "../../app/customHooks/useModal";
import Modal from "../PopUps/Modal";


const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { manga } = useAppSelector((state) => state.mangas);
  console.log('MANGAAAAAA', manga);  
  const { token, verificated } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  console.log('USEEEEEEER', );  
  const headers = useHeaders(token)

  
  useEffect(() => {
    dispatch(fetchDetailManga ( id ));
    return dispatch(fetchCleanDetails());
  }, [dispatch, id]);

  // Modal state
  const { modalOpen, close, open } = useModal();

  // Modal type
  const [modalType, setModalType] = useState("dropIn");

  return (
    <motion.div variants={carAnimation} animate='show' exit='hide' className="five detail-container">
      <title>
        <h2>{manga.title}</h2>
      </title>
      <header>
        <motion.div variants={h3Animation} animate='show' exit='hide' className="image-container">
          <img src={`${manga.cover_image}`} alt={`cover_page_${manga._id}`} />
        </motion.div>
        <div className="info-container">
          <Rating rating={manga.rating}/>
            <span>
              {
                verificated 
                ? <motion.button
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                className='save-button'
                onClick={()=>{dispatch(FetchFavoriteMangas(userId, manga._id, headers))}}>
                  <IoIosHeart />
              </motion.button>
                :
              <div>
                <motion.button
                  whileHover={{scale:1.1}}
                  whileTap={{scale:0.9}}
                  className='save-button'
                  onClick={()=>{modalOpen? close() : open()}}>
                    <IoIosHeart />
                </motion.button>
                
                <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
                >
                {modalOpen && (
                <Modal 
                modalOpen={modalOpen} 
                text={modalType} 
                type={modalType} 
                handleClose={close} />
                )}
              </AnimatePresence>
              </div>
                }
            </span>
          <ul>
            {manga.genres.map((genre: string, i: number) => (
              <li key={`${manga.title}_detail ${i}`}>{genre}</li>
            ))}
          </ul>
        </div>
      </header>
      <h2 className="sub-title">Description :</h2>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
        <div>
          {
            manga.mangas.map((e : any)=> {
              return (
               
                  <div>{e.chapter}
                  {e.link.map((e : any)=> <img src={e}/>)}
                  </div>
                
              )
            })
          }
        </div>
      <Comments/>
    </motion.div>
  );
};

export default Detail;

