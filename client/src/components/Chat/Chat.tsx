import io from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';

import { InitialState, logOut } from "../../features/user/userSlice";
import { useState, useEffect, useRef } from 'react';
import '../../scss/Chat/Chat.scss';
const socket = io('https://manga-coffee.herokuapp.com');
import { BiMailSend } from 'react-icons/bi';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  //const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const [minimized, setMinimized] = useState(false);
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
        {/* <ScrollToBottom className='chat-container'> */}
          {messageList.map((messageContent: any) => {
            return (
              <div
                id={user.user === messageContent.author ? "you" : "other"}
                className="message-container"
              >

                <div className='burbuja'>
                  <div className="author">
                    <p id="author">{
                      user ?
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
        {<div ref={messageEndRef}/>}
        {/* </ScrollToBottom> */}
      </div>
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
  );
}
export default Chat;