import { useId, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { fetchMangaComments } from './../../../features/manga/mangaSlice';
import '../../../scss/Details/Comments.scss'

type Props = {
  comments: Array<any>;
}

const Comments = ({ comments }: Props) => {
  const id = useId();
  const dispatch = useAppDispatch();
  const comm = useAppSelector(state => state.mangas)
  const [input, setInput] = useState<any>({
    name : 'Tartaglia',
    body : '',
    _id : id,
    time : ''
  });
 
  let currentTime = moment().format();

  const timeAgo = (value : string) => {
    return moment.utc(value).local().startOf('seconds').fromNow();
  };
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setInput({
      ...input,
      [name] : value,
      time: currentTime
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!input.body) {
      return alert('Invalid action')
    }
    dispatch(fetchMangaComments(input))
    setInput({
      name : 'Tartaglia',
      body : '',
      _id : id,
      time : ''
    })
  };

  const arr = [...comm.comments, comments]
  const myArray = arr.flatMap(e => e)
  console.log(myArray, 'flatmap');

  return (
    <div className="comments-container">
      <section className="title-text">
        <h2>Comments</h2>
        <h2>{myArray.length}</h2>
      </section>
      <div className="comment">
        <FaUserCircle
          size={44}
        />
        <div className="input-text">
          <form 
            onSubmit={handleSubmit}
          >
            <input 
              type="text" 
              id="body" 
              name="body" 
              value={input.body}
              onChange={handleChange}
              placeholder="Add a comment..."/>
            <section>
              <button>Cancel</button>
              <button type="submit">Comment</button>
            </section>
          </form>
        </div>
      </div>
      {
        myArray.map((comment : any) => {
          return (
            <>
              <div 
                className="comment"
                key={comment._id}
              >
                <FaUserCircle
                  size={44}
                />
                <section>
                  <h4>{comment.name}<span> {`${comment.time ? timeAgo(comment.time) : "2days ago"}`}</span></h4>
                  <p>{comment.body}</p>
                  <h5>REPLY</h5>
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