import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import { fetchMangaComments } from './../../../features/manga/mangaSlice';
import '../../../scss/Details/Comments.scss'

type Props = {
  comments: Array<any>;
}

const Comments = ({ comments }: Props) => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector(state => state.mangas.manga)
  const comm = useAppSelector(state => state.mangas.manga.comments)
  console.log("MYCOMENTTTTTT", comm)
  const { user } = useAppSelector(state => state.user)
  const [input, setInput] = useState<any>({
    name : '',
    body : '',
    _id : '',
    time : ''
  });
  
  let currentTime = moment().format();

  const timeAgo = (value : string) => {
    return moment.utc(value).local().startOf('seconds').fromNow();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("EEEEEEEEEE", e)
    e.preventDefault()
    setInput({
        name: user,
        body: e.target.value,
        _id: _id,
        time: currentTime
    })
    console.log("INPUUUUUT11111111111", input)
  }
  console.log("INPUUUUUT3333333333333333", input)
  const arr = [...comm]
  console.log('ARRRRRRRRR', arr)

  useEffect(()=>{
    arr
  },[arr])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("EEEEEEEEEE222222222", e)
    console.log("INPUUUUUT22222222222", input)
    e.preventDefault()
    dispatch(fetchMangaComments(input, _id, user))
    setInput({
      name : '',
      body : '',
      _id : _id,
      time : ''
    })
  }

  return (
    <div className="comments-container">
      <section className="title-text">
        <h2>Comments</h2>
        <h2>{arr.length}</h2>
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
      {
        arr.map((c : any) => {
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