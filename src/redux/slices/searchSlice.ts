import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HistoryItem, SearchState } from '../../types'

const initialState: SearchState = {
  searchQuery: '',
  searchHistory: [],
  showResult: false
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
    setShowResult: (state, action: PayloadAction<boolean>) => {
      state.showResult = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSearchQuery, setHistory, setShowResult } = searchSlice.actions

export default searchSlice.reducer