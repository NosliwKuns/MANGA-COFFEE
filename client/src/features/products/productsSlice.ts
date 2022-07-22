import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../app/store';

interface Comments {
  _id : string,
  id_user: string,
  name : string,
  body : string,
  time: string,
}

interface Detail {
  _id : string,
  name: string,
  category: Array<string>
  product_image: string,
  description: string,
  price: number,
  rating: string,  //se tiene que cambiar a number en el back
  comments: Comments[];
  stock: number
}

type InitialState = {
    products: Array<any>,
    productDetail: Detail,
  }


const initialState: InitialState = {
  products: [],
  productDetail: {
    _id : '',
    name: 'string',
    category: [],
    product_image: '',
    description: '',
    price: 0,
    rating: '',  //se tiene que cambiar a number en el back
    comments: [],
    stock: 0
  },
}
  
  const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      getProducts: (state , action : PayloadAction<Array<any>> ) =>{
        state.products = action.payload 
      },
      getProductDetail: (state , action : PayloadAction<Detail> ) =>{
        state.productDetail = action.payload 
      },
      stockProducts: (state, action: PayloadAction<number>) => {
        state.productDetail.stock = action.payload
      },
    }
  });

  export const fetchDetailManga = ( id : string | undefined ):AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)
      dispatch(getProductDetail(data))
    }
  };

  export const fetchGetProducts = ( pageNumber : number | string, search : string ):AppThunk =>{
    return async (dispatch) => {
      const {data} = await axios.get(`http://localhost:5000/api/products?page=${pageNumber}&search=${search}`)
      console.log(data, 'hola');
      dispatch(getProducts(data));
    }
  };
  
  export const fetchModifyStock = ( id : string | undefined, updates : string | number ):AppThunk =>{
    return async (dispatch) => {
      const { data } = await axios.put(`http://localhost:5000/api/products/stock/${id}`, {
        updates
      })
      console.log('DATAAAAAAAAAAAA', data)
      dispatch(stockProducts(data));
    }
  };

  export default productsSlice.reducer
  export const {
    getProductDetail,
    getProducts,
    stockProducts
  } = productsSlice.actions
  

