import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HeritageDetails, MapState, Marker } from '../../types'

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
    setRelatedMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.relatedMarkers = action.payload;
    },
    addRelatedMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.relatedMarkers.push(...action.payload); // 배열 전개 연산자를 사용하여 여러 마커를 추가
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedData, setRelatedMarkers, addRelatedMarkers } = mapSlice.actions

export default mapSlice.reducer