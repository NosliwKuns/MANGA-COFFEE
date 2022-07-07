import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    user: string,
    message : string,
    password :string
  }

const initialState: InitialState = {
    user: '',
    message : '',
    password :''
  }
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {   
      loginUser : (state , action : PayloadAction<string>) =>{
        state.user = action.payload
      }
    }
  })
  
  export default userSlice.reducer
  export const { loginUser } = userSlice.actions
  

