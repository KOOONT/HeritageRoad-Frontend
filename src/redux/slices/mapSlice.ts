import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HeritageDetails, MapState, RelatedItem } from '../../types'

const initialState: MapState = {
  selectedData: null,
  relatedMarkers: []
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setSelectedData : (state, action: PayloadAction<HeritageDetails>) => {
      state.selectedData = action.payload
    },
    setRelatedMarkers: (state, action: PayloadAction<RelatedItem[]>) => {
      state.relatedMarkers = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedData, setRelatedMarkers } = mapSlice.actions

export default mapSlice.reducer