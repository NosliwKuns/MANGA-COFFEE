import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store'
import { db } from "../../firebase";
import {  } from 'firebase/firestore'

interface Chat {
  name: string,
  id: string,
  message: string,
  time : string
}

type InitialState = {
    chat: Array<Chat>,
  }

  const initialState: InitialState = {
    chat: [],
  }
  
  const ChatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
      GlobalChat: (state, action : PayloadAction<Array<Chat>>) => {
        state.chat = [
          ...state.chat,
          Object.assign(action.payload),
        ]
      },
    }
  })

  export const fetchGlobalChat = (msg : any): AppThunk => {
    return async (dispatch) => {
      dispatch(GlobalChat(msg))
    }
  };

//   export const logIn = (email: string, password: string): AppThunk => {
//     return async () => {
//       await signInWithEmailAndPassword(auth, email, password);
//     };
//   };
  
//   useEffect(() => {
//     db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot: any => {
//         setMessages(snapshot.docs.map(doc => doc.data()))
//     })
// }, [])
  
  export default ChatSlice.reducer
  export const { GlobalChat } = ChatSlice.actions
  

