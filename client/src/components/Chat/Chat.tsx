import io from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';
import { motion } from 'framer-motion';
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
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { IoIosSend } from 'react-icons/io';

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  //const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const [minimized, setMinimized] = useState(false);
  const [active, setActive] = useState(false);
  const [nose, setNose] = useState(false);
  const [mQuery, setMQuery] = useState<any>({
    matches: window.innerWidth < 768 ? true : false,
  });
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
    if (!mQuery.matches) {
      setMinimized(!minimized)
    } else {
      a('#chat-app')
    }
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




  function chatInit(selector : any) {
      
        let chat = document.querySelector(selector);
        /* let toggles = chat.querySelectorAll('.toggle') */
        
        
        /* window.setTimeout(() => { */
          chat.classList.add('is-active')
        /* }, 600) */
        
        /* toggles.forEach( (toggle : any) => {
          toggle.addEventListener('click', () => {
            chat.classList.add('is-active')
          })
        }) */
        
        /* document.onkeydown = function(evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            } else {
                isEscape = (evt.keyCode === 27);
            }
            if (isEscape) {
                chat.classList.remove('is-active')
            }
        }; */
  }

  const a = (selector : any) => {
    let chat = document.querySelector(selector);
    window.setTimeout(() => {
      chat.classList.remove('is-active')
    }, 0)
  }


  useEffect(() => {
    let mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addListener(setMQuery);
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeListener(setMQuery);
  }, []);
  
  console.log(minimized)

  return (
    // <div className={minimized ? "chat-container" : "chat-container is-minimized"}>
    //   <div className='chat-up' onClick={minimizedChat}>
    //     {
    //       user.user ?
    //         <h6 className="welcome-text">Hi <b>{user.user}</b>, <br />
    //           Chat with Friends, "A place to connect with other fans"</h6>
    //         :
    //         <h6 className="welcome-text">
    //           Chat with Friends, "A place to connect with other fans"
    //         </h6>
    //     }
    //   </div>

    //   <div className={user.user ? "chat-content" : "chat-content blur"}>
    //     <br/>
    //     {/* <ScrollToBottom className='chat-container'> */}
    //       {messageList.map((messageContent: any) => {
    //         return (
    //           <div
    //             id={user.user === messageContent.author ? "you" : "other"}
    //             className="message-container"
    //           >

    //             <div className='burbuja'>
                
    //               <div className="message">
    //                 <p>{messageContent.message}</p>
    //               </div>
                  
    //             </div>
    //             <div className='info-send'>

                  
    //                 <div className="author">
    //               <Link id="author"
    //                    to={user.user === messageContent.author ? "/userDetail" : "/userDetail"}
    //                    >{
    //                   user ?
    //                     user.user === messageContent.author ?
    //                       "You" : messageContent.author
    //                     : ""

    //                 }</Link>
    //               </div>
    //               <div className="time">
    //                   <p id="time">{messageContent.time}</p>
    //                 </div>
    //               </div>
    //           </div>
              
    //         );
    //       })}
    //     {<div ref={messageEndRef}/>}
    //     {/* </ScrollToBottom> */}
    //   </div>
      
    //   {
    //     user.user && user.verificated ?
    //       <div className="bar-Send">
    //         <input
    //           type="text"
    //           className='input-Send'
    //           value={currentMessage}
    //           placeholder="Message..."
    //           onChange={(e) => {
    //             setCurrentMessage(e.target.value);
    //           }}
    //           onKeyPress={(event) => {
    //             event.key === "Enter" && sendMessage();
    //           }}
    //         />
    //         <button className="btn-Send" onClick={sendMessage}>
    //           <BiMailSend />
    //         </button>

    //       </div>
    //       :
    //       <div className="bar-Send" onClick={() => handleChange()}>
    //         <input
    //           type="text"
    //           className='input-Send'
    //           value={currentMessage}
    //           placeholder="Message..."
    //           disabled={true}
    //           onKeyPress={(event) => {
    //             event.key === "Enter" && sendMessage();
    //           }}
    //         />
    //         <button className="btn-Send" onClick={sendMessage}>
    //           <BiMailSend />
    //         </button>

    //       </div>
    //   }
    // </div>
  <div id="chat-app" className={mQuery.matches ? "chat-app" : "chat-app is-active"}>
  
  <motion.div 
    className="chat-app_toggle toggle"
    drag
    dragConstraints={{ left: 0, top: 0, right: 0, bottom: -70 }}
    >
    <div 
      onClick={sendMessage}
      className="icon send">
      <IoIosSend />
    </div>
    <div 
      className="icon open"  
      onClick={() => {
        chatInit('#chat-app');
        setMinimized(true);
      }}
    >
      <AiFillMessage />
    </div>
  </motion.div>

  <div className="chat-app_box">
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
        <button onClick={() => a('#chat-app')} id="close" className="btn">xcv</button>
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
    </div>
</div>
  );
}
export default Chat;