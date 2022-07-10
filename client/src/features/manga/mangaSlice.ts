import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk } from '../../app/store'

interface Chapter  {
  chapter : number, 
  link : Array<string>
}

interface Detail {
  _id : string,
  title : string ,
  genres : Array<string> ,
  description : string,
  cover_image : string,
  mangas : Chapter[],
  rating : number
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
      cover_image : '', 
      mangas : [],
      rating : 0
    }
  }
  
  const mangaSlice = createSlice({
    name: 'mangas',
    initialState,
    reducers: {
      getAddMangas : (state , action : PayloadAction<Detail[]> ) =>{
        state.mangas = action.payload
      },
      getDetailManga : (state , action : PayloadAction<Detail> ) =>{
        state.manga = action.payload 
      },
      searchMangaByName: (state, action : PayloadAction<Detail[]>) => {
        state.mangas = action.payload
      },
      filterMangaByGenres: (state, action : PayloadAction<Detail[]>) => {
        state.mangas = action.payload
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

  export const fetchMangaByGenres = (genre: string): AppThunk => {
    console.log(genre)
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga`)
      let a = data.filter((e: any) => e.genres.includes(genre));
      console.log(a)
      dispatch(filterMangaByGenres(a))
    }
  }

  
  export default mangaSlice.reducer
  export const { 
      getAddMangas, 
      getDetailManga, 
      searchMangaByName, 
      filterMangaByGenres
  } = mangaSlice.actions
  

