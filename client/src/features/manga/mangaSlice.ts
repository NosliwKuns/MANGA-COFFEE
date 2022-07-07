import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type InitialState = {
    mangas: Array<Object>,
  }


  const initialState: InitialState = {
    mangas: [],
  }
  
  const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {

    }
  })
  
  export default mangaSlice.reducer
  export const {  } = mangaSlice.actions
  

