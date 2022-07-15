import { useState, useEffect, useRef } from "react";
import { /* db, */ auth } from "../../firebase";
import SendMessage from "./SendMessage";

const Chat = () => {
  const scroll = useRef() 
  const [messages, setMessages] = useState<Array<any>>([])
  useEffect(()=> {
    // db.colection('messages').orderBy('createdAt').limit(50).onSnapshot({
      // setMessages(snapshot.docs.map(doc = doc.data()))
    // }) // esto es con la configuracion de firestore en la cuenta de google, hay que anclarlo 
    // en la web de firebase
  }, [])

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