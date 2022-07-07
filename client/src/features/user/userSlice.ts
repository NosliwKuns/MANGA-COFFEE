import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    user: string,
    message : string
  }

const initialState: InitialState = {
    user: '',
    message : ''
  }
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {   

    }
  })
  
  export default userSlice.reducer
  export const {  } = userSlice.actions
  

