import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HeritageItem, SearchState } from '../types'

const initialState: SearchState = {
  result: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<HeritageItem[]>) => {
      state.result = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setResult } = searchSlice.actions

export default searchSlice.reducer