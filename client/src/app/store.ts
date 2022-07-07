import {Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import mangaReducer from '../features/manga/mangaSlice'
import productsReducer from '../features/products/productsSlice'
import userReducer from '../features/user/userSlice'
const store = configureStore({
  reducer: {
    mangas : mangaReducer,
    products : productsReducer ,
    user : userReducer
  }
})

export default store
  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void > = ThunkAction < 
ReturnType,
RootState,
unknown,
Action<string>
>;