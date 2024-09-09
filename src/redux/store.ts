import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './slices/mapSlice'
import searchSlice from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    map: mapReducer,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 직렬화 상태 체크 비활성화
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch