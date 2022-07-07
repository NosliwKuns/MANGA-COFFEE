import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk } from '../../app/store'

interface Detail {
  _id : string,
  title : string ,
  genres : Array<string> ,
  description : string,
  image_backgraund : string,
  charapters : Array<string> ,
}

type InitialState = {
    mangas: Detail[], // Array<any>
    manga : Detail
  }


const initialState: InitialState = {
    mangas: [],
    manga : {
      _id : '',
      title : '',
      genres : [''],
      description : '',
      image_backgraund : '',
      charapters : [''] ,
    }
  }
  
  const mangaSlice = createSlice({
    name: 'mangas',
    initialState,
    reducers: {
      getAddMangas : (state , action) =>{
        state.mangas.push(...action.payload)
      },
      getDetailManga : (state , action) =>{
        state.manga = action.payload 
      }
    }
  })

  export const fetchAllManga = ():AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get("https://manga-coffee.herokuapp.com/api/manga")
      dispatch(getAddMangas(data.results))
      return data.results
    }
  }

  export const fetchDetailManga = ( id : string | undefined ):AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/${id}`)
      dispatch(getDetailManga(data.results))
      return data.results
    }
  }

  
  export default mangaSlice.reducer
  export const { getAddMangas , getDetailManga } = mangaSlice.actions
  

