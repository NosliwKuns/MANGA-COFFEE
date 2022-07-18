import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { fetchMangaComments, deleteComment } from './../../../features/manga/mangaSlice';
import '../../../scss/Details/Comments.scss'


const Comments = () => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(state => state.mangas.manga)
  const mangaId = useAppSelector(state => state.mangas.manga._id)
  const newComment = useAppSelector(state => state.mangas.comments)
  console.log('COMENTARIOOO', newComment);
  const { user, id } = useAppSelector(state => state.user)
  console.log('ME LLEGA EL ID?', id);
  
  const [input, setInput] = useState<any>({
    name : '',
    body : '',
    mangaId : '',
    time : '',
    userId: ''
  });
  
  let currentTime = moment().format();

  const timeAgo = (value : string) => {
    return moment.utc(value).local().startOf('seconds').fromNow();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput({
        name: user,
        body: e.target.value,
        mangaId: mangaId,
        time: currentTime,
        userId: id
      })
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchMangaComments(input, mangaId, user, id))
    setInput({
      name : '',
      body : '',
      mangaId : mangaId,
      time : '',
      userId: id
    })
  }

  const currentComments = !newComment.length? comments : newComment

  return (
    <div className="comments-container">
      <section className="title-text">
        <h2>Comments</h2>
        <h2>{currentComments.length}</h2>
      </section>
      <div className="comment">
        <FaUserCircle
          size={44}
        />
        <div className="input-text">
          <form 
            onSubmit={(e) => handleSubmit(e)}
          >
            <input 
              type="text" 
              id="body" 
              name="body" 
              value={input.body}
              onChange={(e) => handleChange(e)}
              placeholder="Add a comment..."/>
            <section>
              <button>Cancel</button>
              <button type="submit">Comment</button>
            </section>
          </form>
        </div>
      </div>
      { currentComments?.map((c : any) => {
          return (
            <>
              <div 
                className="comment"
                key={c._id}
              >
                <FaUserCircle
                  size={44}
                />
                <section>
                  <h4>{c.name}<span> {`${c.time ? timeAgo(c.time) : "2days ago"}`}</span></h4>
                  <p>{c.body}</p>
                  <h5>REPLY</h5>
                  <button onClick={()=> dispatch(deleteComment(c._id, mangaId))}>Delete</button>
                </section>
              </div>
              <span className="separator"></span>
            </>
          )
        })
      }
    </div>
  )
};

export default Comments;