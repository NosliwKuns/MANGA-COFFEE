import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk } from '../../app/store'


type InitialState = {
    mangas: Array<any>,
  }


const initialState: InitialState = {
    mangas: [],
  }
  
  const mangaSlice = createSlice({
    name: 'mangas',
    initialState,
    reducers: {
      getAddMangas : (state , action) =>{
        state.mangas.push(...action.payload)
      }
    }
  })

  export const fetchAllManga = ():AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get("http://localhost:3001/api/manga")
      dispatch(getAddMangas(data.results))
      return data.results
    }
  }

  
  export default mangaSlice.reducer
  export const { getAddMangas } = mangaSlice.actions
  

