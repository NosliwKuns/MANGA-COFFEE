import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store'

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
  
  export default ChatSlice.reducer
  export const { GlobalChat } = ChatSlice.actions
  

