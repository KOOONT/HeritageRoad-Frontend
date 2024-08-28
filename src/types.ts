import { ReactNode } from "react";

export interface HeritageItem {
  sn: number,
  no: number,
  ccmaName: string,
  ccbaMnm1: string,
  ccbaMnm2: string,
  ccbaCtcdNm: string,
  ccsiName: string,
  ccbaAdmin: string,
  ccbaKdcd: string,
  ccbaCtcd: string,
  ccbaAsno: string,
  ccbaCncl: string,
  ccbaCpno: string,
  longitude: string,
  latitude: string,
  regDt: string
}
export interface HeritageList {
  totalCnt: number,
  pageUnit: number,
  pageIndex: number,
  items: HeritageItem[]
}
export interface MapState {
  markers: HeritageItem[]
}

export interface BottomModalProps {
  title: string,
  isVisible: boolean,
  children: ReactNode,
  onClose: () => void
}