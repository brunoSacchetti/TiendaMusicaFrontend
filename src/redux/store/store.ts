import { configureStore } from '@reduxjs/toolkit'

//Reducers
import cartSlice from '../slices/cartSlice'
import auth from '../slices/auth'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: auth
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch