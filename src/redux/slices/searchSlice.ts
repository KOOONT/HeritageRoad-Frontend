import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HistoryItem, SearchState } from '../../types'

const initialState: SearchState = {
  searchHistory: [],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      state.searchHistory = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setHistory } = searchSlice.actions

export default searchSlice.reducer