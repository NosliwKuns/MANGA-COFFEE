import { useState, useEffect, useRef } from "react";
import { db, auth } from "../../firebase";
import SendMessage from "./SendMessage";

const Chat = () => {
  const scroll = useRef() 
  const [messages, setMessages] = useState<Array<any>>([])
    
//   useEffect(() => {
//     db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot: any => {
//         setMessages(snapshot.docs.map(doc => doc.data()))
//     })
// }, [])

  return (
    <div className="comments-container">
      {messages.map(({id, text, photoURL, uid}) => {
        return (
          <div className="msgs">
            <div key={id} className={`${uid === auth.currentUser?.uid ? 'sent' : 'recieved'}`}>
              <img src={photoURL} alt="user-img"/>
              <p>{text}</p>
            </div>
          </div>
        )})}
        <SendMessage /* scroll={scroll} *//>
        {/* <div ref={scroll}></div> */}
    </div>
  )
};

export default Chat;