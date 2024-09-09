import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HeritageItem, HistoryItem, SearchState } from '../../types'

const initialState: SearchState = {
  searchQuery: '',
  searchHistory: [],
  result: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
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
export const { setSearchQuery, setHistory, setResult } = searchSlice.actions

export default searchSlice.reducer