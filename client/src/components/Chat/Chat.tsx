import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import  ScrollToBottom from "react-scroll-to-bottom";
import '../../scss/Chat/Chat.scss';
const socket = io('http://localhost:5000');
import { BiMailSend } from 'react-icons/bi';

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);

  const sendMessage = () => {
    if (currentMessage !== "") {
        const messageData = {
        author: username,
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
  
  return (
    <div className="chat-container">
      
        <ScrollToBottom>
          {messageList.map((messageContent : any) => {
            return (
              <div
                id={username === messageContent.author ? "you" : "other"}
              >
                <div className='burbuja'>
                <div className="author">
                    <p id="author">{messageContent.author}</p>
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
         
         
        </ScrollToBottom>
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
    </div>
  );
}
  export default Chat;