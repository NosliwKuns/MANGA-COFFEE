import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk } from '../../app/store'

interface Chapter  {
  chapter : number, 
  link : Array<string>
}

interface Comments {
  name : string,
  body : string,
  _id : string,
  time: string
}

interface Detail {
  _id : string,
  title : string ,
  genres : Array<string> ,
  description : string,
  cover_image : string,
  mangas : Chapter[],
  rating : number,
  comments : Comments[]
}

interface allMangas {
  error : boolean
  totalPages : number
  category : Array<string>
  mangas : Detail[]
}

type InitialState = {
    mangas: allMangas, // Array<any>
    manga : Detail,
    comments : Comments[],
    commentsCopy : Comments[],
    genres: Array<string>,
    category: Array<any>
  }

const initialState: InitialState = {
  mangas: {
    error: false,
    totalPages: 0,
    category: [''],
    mangas: [],
  },
  manga : {
    _id : '',
    title : '',
    genres : [''],
    description : '',
    cover_image : '', 
    mangas : [],
    rating : 0,
    comments : []
  },
  comments : [],
  commentsCopy : [],
  genres : [],
  category: [],
  }
  
  const mangaSlice = createSlice({
    name: 'mangas',
    initialState,
    reducers: {
      getAddMangas : (state , action : PayloadAction<allMangas> ) =>{
        // console.log(action.payload, 'whatttt');
        state.mangas = action.payload
      },
      getDetailManga : (state , action : PayloadAction<Detail> ) =>{
        state.manga = action.payload 
      },
      searchMangaByName: (state, action : PayloadAction<allMangas>) => {
        state.mangas = action.payload
      },
      filterMangaByGenres: (state, action : PayloadAction<Array<object>>) => {
        // console.log("QUEJESTOOOOO", action.payload);
        state.category = action.payload
      },
      SortByName: (state, action : PayloadAction<allMangas>) => {
        state.mangas = action.payload
      },
      SortByRating: (state, action : PayloadAction<allMangas>) => {
        state.mangas = action.payload
      },
      mangaComments: (state, action : PayloadAction<Comments[]>) => {
        console.log("QUE ME LLEGAAAAA REDUCER", action.payload)
        state.comments = action.payload
      },
      cleanDetails: (state) => {
        state.manga = {
          _id : '',
          title : '',
          genres : [''],
          description : '',
          cover_image : '', 
          mangas : [],
          rating : 0,
          comments : []
        }
      },
      paginate: (state, action : PayloadAction<allMangas>) => {
        // console.log('REDUCEEEEERRR!!!!!', action.payload)
        state.mangas = action.payload
      },
      getGenres: (state, action : PayloadAction<string[]>) => {
        state.genres = action.payload
      },
      cleanCategories: (state) => {
        state.category = []
      },
      commentDelete: (state, action : PayloadAction<Comments[]>) => {
        state.comments = action.payload
      },
    }
  })
  
  export const fetchAllManga = (pageNumber : number, search : string, genres: string):AppThunk =>{
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/manga/?page=${pageNumber}&search=${search}&genres=${genres}`)
        console.log(data, 'yeahhh')
        dispatch(getAddMangas(data)) 
      } catch (error) {
        console.error(error)
      }
    }
  };

  export const fetchDetailManga = ( id : string | undefined ):AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/${id}`)
      dispatch(getDetailManga(data))
    }
  };
  
  export const fetchMangaByName = (name: string | number): AppThunk => {
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/?search=${name}`)
      dispatch(searchMangaByName(data))
    }
  }
  
  export const fetchMangaByGenres = (genre: string): AppThunk => {
    console.log(genre)
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/?genre=${genre}`)
      dispatch(filterMangaByGenres(data.docs))
    }
  }
  
  export const fetchMangaSortByName = (name: string): AppThunk => {
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/?${name}`)
      dispatch(searchMangaByName(data))
    }
  }

  export const fetchMangaSortByRating = (rating: string): AppThunk => {
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/?${rating}`)
      dispatch(searchMangaByName(data))
    }
  };

  export const fetchMangaComments = (comment : any | null, id: string, name: string | null, userId: string): AppThunk => {
    return async (dispatch) => {
      console.log(comment, "MY COMMENTTTTT")
      const {data} = await axios.put(`https://manga-coffee.herokuapp.com/api/manga/${id}`, {
        name,
        body: comment.body,
        time: comment.time,
        userId,
      })
      console.log('QUE DEVUELVEEEEEE ACTION', data)
      dispatch(mangaComments(data))
    }
  };

  export const fetchCleanDetails = () => {
    return (dispatch : any)  => {
      dispatch(cleanDetails())
    }
  };
  
  export const fetchPagination = (page: string): AppThunk => {
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/?page=${page}`)
      console.log('PAGINADOOOOO',data)
      dispatch(paginate(data))
    }
  };

  export const fetchGetGenres = () : AppThunk => {
    return async (dispatch) => {
      const { data } = await axios.get(`https://manga-coffee.herokuapp.com/api/manga/genres`)
      dispatch(getGenres(data))
    }
  };
  
  export const fetchCleanCategories = () => {
    return (dispatch : any)  => {
      dispatch(cleanCategories())
    }
  };
  
  export const deleteComment = (id : string, mangaId : any) : AppThunk => {
    return async (dispatch: any) => {
      const { data } = await axios.delete(`https://manga-coffee.herokuapp.com/api/manga/deletecomments/comments/?id=${id}&mangaId=${mangaId}`)
      console.log('SOY EL NO DISPATCH', data.comments);
      dispatch(commentDelete(data.comments))
      
    }
  };

  
  export default mangaSlice.reducer
  export const { 
    getAddMangas, 
      getDetailManga, 
      searchMangaByName, 
      filterMangaByGenres,
      SortByName,
      SortByRating,
      mangaComments,
      cleanDetails,
      paginate,
      getGenres,
      cleanCategories,
      commentDelete,
  } = mangaSlice.actions

  

