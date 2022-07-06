import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type InitialState = {
    products: Array<Object>,
  }


  const initialState: InitialState = {
    products: [],
  }
  
  const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        
    }
  })
  
  export default productsSlice.reducer
  export const {  } = productsSlice.actions
  

