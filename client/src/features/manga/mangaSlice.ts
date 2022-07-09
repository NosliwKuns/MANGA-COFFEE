import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk } from '../../app/store'

interface Detail {
  _id : string,
  title : string ,
  genres : Array<string> ,
  description : string,
  cover_image : string,
  chapters : Array<string> ,
}

// export type Search = {
//   name: string
// }

type InitialState = {
    mangas: Detail[], // Array<any>
    manga : Detail,
    // mangaName: Search
  }

const initialState: InitialState = {
    mangas: [],
    manga : {
      _id : '',
      title : '',
      genres : [''],
      description : '',
      cover_image : '',
      chapters : [''] ,
    }
  }
  
  const mangaSlice = createSlice({
    name: 'mangas',
    initialState,
    reducers: {
      getAddMangas : (state , action : PayloadAction<Detail[]> ) =>{
        state.mangas.push(...action.payload)
      },
      getDetailManga : (state , action : PayloadAction<Detail> ) =>{
        state.manga = action.payload 
      },
      searchMangaByName: (state, action : PayloadAction<any>) => {
        state.mangas.push(action.payload)
      }
    }
  })

  export const fetchAllManga = ():AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get("https://manga-coffee.herokuapp.com/api/manga")
      console.log(data)
      dispatch(getAddMangas(data))
    }
  }

  export const fetchDetailManga = ( id : string | undefined ):AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/${id}`)
      dispatch(getDetailManga(data))
      return data
    }
  }
  
  export const fetchMangaByName = (name: string | number): AppThunk => {
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/search?name=${name}`)
      dispatch(searchMangaByName(data))
    }
  }

  
  export default mangaSlice.reducer
  export const { getAddMangas , getDetailManga, searchMangaByName } = mangaSlice.actions
  

