import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { fetchMangaComments, deleteComment } from './../../../features/manga/mangaSlice';
import '../../../scss/Details/Comments.scss'

const Comments = () => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(state => state.mangas.manga)
  console.log("COMMENTSSSSSSS", comments);
  const mangaId = useAppSelector(state => state.mangas.manga._id)
  const newComment = useAppSelector(state => state.mangas.comments)
  console.log("NEW COMMENTTTTTT", newComment);
  const { user, id, verificated } = useAppSelector(state => state.user)
  
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
    if(user && !verificated) {
      alert('Please verify your account!')
    } else if(user && verificated) {
      if(!input.body) {
        alert('Write a comment')
      } else {
        dispatch(fetchMangaComments(input, mangaId, user, id))
        setInput({
          name : '',
          body : '',
          mangaId : mangaId,
          time : '',
          userId: id
        })
      }
    } else if(!user && !verificated){
      alert('To comment, you must Sign In!')
    }
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInput({
      name : '',
      body : '',
      mangaId : mangaId,
      time : '',
      userId: id
    })
  }

  useEffect(()=>{

  },[comments])

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
              <span onClick={handleCancel} >Cancel </span>
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
                  <button onClick={()=> c.userId === id ? dispatch(deleteComment(c._id, mangaId)) : alert('invalid Action!')}>Delete</button>
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