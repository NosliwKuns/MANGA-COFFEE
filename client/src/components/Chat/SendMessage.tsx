import React, { useState } from "react";
import { app, auth, db } from "../../firebase";
import firebase from 'firebase/firestore'
const SendMessage = (/* {scroll: React.MutableRefObbject<undefined>} */) => {
    const [msg, setMsg] = useState<string>('')

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const {uid, photoURL} = auth.currentUser
        // await db.collection('messages').add({
        //     text: msg,
        //     photoURL,
        //     uid,
        //     createdAt: db.fieldValue.serverTimestamp()
        // })
        setMsg('')
        // scroll.current.scrollIntoView({behavior: 'smooth'})
    }

    return (
      <div className="comments-container">
        <form onSubmit={(e)=> sendMessage(e)}>
            <input 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Your Message..."
            />
            <button type="submit">Send</button>
        </form>
      </div>
    )
  };
  
  export default SendMessage;