import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MapState, HeritageItem } from '../types'

const initialState: MapState = {
  markers: []
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMarkers: (state, action: PayloadAction<HeritageItem[]>) => {
      // 상태에 새로운 마커들을 추가
      state.markers = action.payload; // 전체 마커를 새로 설정
    },
    addMarkers: (state, action: PayloadAction<HeritageItem[]>) => {
      state.markers.push(...action.payload); // 배열 전개 연산자를 사용하여 여러 마커를 추가
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMarkers, addMarkers } = mapSlice.actions

export default mapSlice.reducer