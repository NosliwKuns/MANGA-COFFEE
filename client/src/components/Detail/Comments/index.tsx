import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { fetchMangaComments, deleteComment } from './../../../features/manga/mangaSlice';
import '../../../scss/Details/Comments.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Comments = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { comments } = useAppSelector(state => state.mangas.manga)
  const mangaId = useAppSelector(state => state.mangas.manga._id)
  const newComment = useAppSelector(state => state.mangas.comments)
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
      const MySwal = withReactContent(Swal)
        MySwal.fire({
          html: <><BsFillInfoCircleFill size={55}/> <h1>Please verify your account!</h1> <h3>Check your e-mail to verify your account</h3></>,
          showCloseButton: true,
          focusConfirm: false,
          background: "#212429",
          confirmButtonText:
            'Ok',
          confirmButtonAriaLabel: 'Ok',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'confirmButton'
          }
        })
    } else if(user && verificated) {
      if(!input.body) {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          html: <><BsFillInfoCircleFill size={55}/> <h1>Write a comment</h1></>,
          showCloseButton: true,
          focusConfirm: false,
          background: "#212429",
          confirmButtonText:
            'Ok',
          confirmButtonAriaLabel: 'Ok',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'confirmButton'
          }
        })
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
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><BsFillInfoCircleFill size={55}/> <h2>To comment, you must Sign In!</h2></>,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        confirmButtonText:
          <div onClick={() => navigate("/logeo", { replace: true })} className="divSignIn">Sign In</div>,
        confirmButtonAriaLabel: 'Sign In',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmButton'
        }
      })
    }
  }

  const handleCancel = () => {
    setInput({
      name : '',
      body : '',
      mangaId : mangaId,
      time : '',
      userId: id
    })
  }

  const handleDelete = (uId: string, cId: string) => {
    const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><RiErrorWarningFill size={55}/> <h1>Are you sure you want to delete this comment?</h1><h3>You won't be able to revert this!</h3></>,
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: true,
        background: "#212429",
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonAriaLabel: 'Delete it',
        buttonsStyling: false,
          customClass: {
            confirmButton: 'confirmButtonDelete',
            cancelButton: 'cancelButtonDelete'
          }
      }).then((result) => {
        if (result.isConfirmed) {
          if (uId === id) {
            dispatch(deleteComment(cId, mangaId))
          }
          MySwal.fire({
            icon: 'success',
            html: <><h1>Deleted!</h1><h3>Your comment has been deleted successfully.</h3></>,
            focusConfirm: false,
            confirmButtonColor: "#ea374b",
            background: "#212429",
            confirmButtonText: 'Ok',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'confirmButton',
            }
          })
          } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire({
            icon: 'error',
            html: <><h1>Cancelled!</h1><h3>Your Comment is safe :)</h3></>,
            focusConfirm: false,
            confirmButtonColor: "#ea374b",
            background: "#212429",
            confirmButtonText: 'Ok',buttonsStyling: false,
            customClass: {
              confirmButton: 'confirmButton',
            }
          })
        }
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
              <div onClick={handleCancel} className="CancelCommentButton">Cancel </div>
              <button type="submit" className='AddCommentButton'>Comment</button>
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
                  {c.userId === id ? <button onClick={()=> handleDelete(c.userId, c._id)} className="DeleteCommentButton">Delete</button> : ""}
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