import io from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';

import { InitialState, logOut } from "../../features/user/userSlice";
import { useState, useEffect, useRef } from 'react';
import  ScrollToBottom from "react-scroll-to-bottom";
import '../../scss/Chat/Chat.scss';
const socket = io('http://localhost:5000');
import { BiMailSend } from 'react-icons/bi';
import scrollIntoView from 'scroll-into-view-if-needed';

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  //const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const [minimized, setMinimized] = useState(false);
 
  const user: InitialState = useAppSelector((state) => state.user);

  const sendMessage = () => {
    if (currentMessage !== "") {
        const messageData = {
        author: user.user,
        message: currentMessage,
        time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        socket.emit("send_message", messageData);
        setMessageList(messageList.concat(messageData));
        
      setCurrentMessage("");
    }
  };

    
  

  useEffect(() => {
    socket.on("receive_message", (data : any) => {
      
      setMessageList((list) => {
        if(list.includes(data)){
          return list;
        }
        return list.concat(data);
      });
    });
  }, [socket]);

  const minimizedChat = () => {
    setMinimized(!minimized)
  }
  const messageListEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messageListEndRef.current) {
      scrollIntoView(messageListEndRef.current, {
        scrollMode: "if-needed",
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);
  
  
  return (
    <div className={/* user.user ? "chat-container" : "blur" */ minimized ? "chat-container" : "chat-container is-minimized"}>
      <div className='chat-up' onClick={minimizedChat}>
        {
          user.user ?
          <h6 className="welcome-text">Hola <b>{user.user}</b>, <br/>
          saluda y conoce gente de todo el mundo</h6>
          :
          <h6 className="welcome-text">
            Saluda y conoce gente de todo el mundo
          </h6>
        }
      </div>

      <div className={user.user ? "chat-content" : "chat-content blur"}>
          {messageList.map((messageContent : any) => {
            return (
              <div
                id={user.user === messageContent.author ? "you" : "other"}
                className="message-container messageListEndRef"
              >
               
               <div className='burbuja'>
                <div className="author">
                    <p id="author">{
                      user?
                      user.user === messageContent.author ?
                      "You" : messageContent.author
                      : ""

                    }</p>
                    </div>
                  <div className="message">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='info-send'>

                    <div className="time">
                    <p id="time">{messageContent.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messageListEndRef} />
        
      </div>
      <div className='bar-send-first'>
       {
          user.user ?
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
     <div className="bar-Send">
          <input
         type="text"
         className='input-Send'
         value={currentMessage}
         placeholder="Message..."
         disabled={true}
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
        }
       </div>
    </div>
  );
}
  export default Chat;