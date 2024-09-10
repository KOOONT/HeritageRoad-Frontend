import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HeritageItem, HistoryItem, SearchState } from '../../types'

const initialState: SearchState = {
  loading: false,
  searchQuery: '',
  searchHistory: [],
  result: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      state.searchHistory = action.payload;
    },
    setResult: (state, action: PayloadAction<HeritageItem[]>) => {
      state.result = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading, setSearchQuery, setHistory, setResult } = searchSlice.actions

export default searchSlice.reducer