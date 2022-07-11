import { useId, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchGlobalChat } from '../../features/ChatSlice/ChatSlice';
import '../../../scss/Details/Comments.scss'

const Chat = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const sms = useAppSelector(state => state.chat)
  const [input, setInput] = useState<any>({
    name: 'Me',
    id: id,
    message: '',
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
    dispatch(fetchGlobalChat(input))
    setInput({
      name : 'Me',
      id : id,
      message : '',
      time : ''
    })
  };

  const arr = [...sms.chat]
  const myArray = arr.flatMap(e => e)
  console.log(myArray, 'flatmap');
  
  return (
    <div className="comments-container">
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
                  <p>{comment.message}</p>
                  <h5>REPLY</h5>
                </section>
              </div>
              <span className="separator"></span>
            </>
          )
        })
      }
      <section className="title-text">
        <h2>Chat</h2>
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
              placeholder="Chat with others..."/>
            <section>
              <button>Cancel</button>
              <button type="submit">Comment</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Chat;