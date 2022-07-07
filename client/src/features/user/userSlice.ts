import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    user: string,
    password :string
  }

const initialState: InitialState = {
    user: '',
    password :''
  }
  
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {   
      loginUser : (state , action : PayloadAction<InitialState>) =>{
        state = action.payload
      }
    }
  })
  
  export default userSlice.reducer
  export const { loginUser } = userSlice.actions
  

