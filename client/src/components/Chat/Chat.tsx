import io from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';

import { InitialState, logOut } from "../../features/user/userSlice";
import { useState, useEffect, useRef } from 'react';
import '../../scss/Chat/Chat.scss';
const socket = io('https://manga-coffee.herokuapp.com');
import { BiMailSend } from 'react-icons/bi';
import ScrollToBottom from 'react-scroll-to-bottom';
import {Link} from 'react-router-dom'
import moment from 'moment';
import '../../scss/Details/Comments.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BsFillInfoCircleFill } from 'react-icons/bs'

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  //const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const [minimized, setMinimized] = useState(true);
  const messageEndRef = useRef<any>(null);

  const user: InitialState = useAppSelector((state) => state.user);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        author: user.user,
        message: currentMessage,
        time: moment().format('h:mm a'),
          /* new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(), */
      };

      socket.emit("send_message", messageData);
      setMessageList(messageList.concat(messageData));

      setCurrentMessage("");
    }
  };




  useEffect(() => {

    socket.on("receive_message", (data: any) => {

      setMessageList((list) => {
        if (list.includes(data)) {
          return list;
        }
        return list.concat(data);
      });
    });
  }, [socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView()
  }, [messageList])



  const minimizedChat = () => {
    setMinimized(!minimized)
  }

  const handleChange = () => {
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
  }

  return (
    <div className={minimized ? "chat-container" : "chat-container is-minimized"}>
      <div className='chat-up' onClick={minimizedChat}>
        {
          user.user ?
            <h6 className="welcome-text">Hi <b>{user.user}</b>, <br />
              Chat with Friends, "A place to connect with other fans"</h6>
            :
            <h6 className="welcome-text">
              Chat with Friends, "A place to connect with other fans"
            </h6>
        }
      </div>

      <div className={user.user ? "chat-content" : "chat-content blur"}>
        <br/>
        {/* <ScrollToBottom className='chat-container'> */}
          {messageList.map((messageContent: any) => {
            return (
              <div
                id={user.user === messageContent.author ? "you" : "other"}
                className="message-container"
              >

                <div className='burbuja'>
                
                  <div className="message">
                    <p>{messageContent.message}</p>
                  </div>
                  
                </div>
                <div className='info-send'>

                  
                    <div className="author">
                  <Link id="author"
                       to={user.user === messageContent.author ? "/userDetail" : "/userDetail"}
                       >{
                      user ?
                        user.user === messageContent.author ?
                          "You" : messageContent.author
                        : ""

                    }</Link>
                  </div>
                  <div className="time">
                      <p id="time">{messageContent.time}</p>
                    </div>
                  </div>
              </div>
              
            );
          })}
        {<div ref={messageEndRef}/>}
        {/* </ScrollToBottom> */}
      </div>
      
      {
        user.user && user.verificated ?
          <div className="bar-Send">
            <input
              type="text"
              className='input-Send'
              value={currentMessage}
              placeholder="Message..."
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button className="btn-Send" onClick={sendMessage}>
              <BiMailSend />
            </button>

          </div>
          :
          <div className="bar-Send" onClick={() => handleChange()}>
            <input
              type="text"
              className='input-Send'
              value={currentMessage}
              placeholder="Message..."
              disabled={true}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button className="btn-Send" onClick={sendMessage}>
              <BiMailSend />
            </button>

          </div>
      }
    </div>
  );
}
export default Chat;