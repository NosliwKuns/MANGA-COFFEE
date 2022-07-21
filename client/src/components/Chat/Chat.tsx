import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import  ScrollToBottom from "react-scroll-to-bottom"
const socket = io('http://localhost:5000');

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);
  console.log('SOY MESSAGE LIIIIIST',);
  

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
        setMessageList( [...messageList, messageData]);
        
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data : any) => {
      setMessageList([...messageList, data]);
    });
  }, [socket]);
  
  return (
    <div>
      <div>
        <p>Live Chat</p>
      </div>
        <ScrollToBottom>
          {messageList.map((messageContent : any) => {
            return (
              <div
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div>
                    <p>{messageContent.message}</p>
                  </div>
                  <div>
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      <input
            type="text"
            placeholder="Nickname..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
    <div>
      <div>
      <div>
        <input
          type="text"
          value={currentMessage}
          placeholder="Message..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      </div>
    </div>
    </div>
  );
}
  export default Chat;