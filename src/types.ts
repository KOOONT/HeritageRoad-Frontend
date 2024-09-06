import { ReactNode } from "react";
import { DimensionValue } from "react-native";

export interface HeritageItem {
  sn: number;
  no: number;
  ccmaName: string;
  ccbaMnm1: string;
  ccbaMnm2: string;
  ccbaCtcdNm: string;
  ccsiName: string;
  ccbaAdmin: string;
  ccbaKdcd: string;
  ccbaCtcd: string;
  ccbaAsno: string;
  ccbaCncl: string;
  ccbaCpno: string;
  longitude: string;
  latitude: string;
  regDt: string;
}
export interface HeritageList {
  totalCnt: number;
  pageUnit: number;
  pageIndex: number;
  items: HeritageItem[];
}
export interface MapState {
  markers: HeritageItem[];
}
export interface SearchState {
  result: HeritageItem[];
}
export interface BottomModalProps {
  title: string;
  subTitle: string;
  isVisible: boolean;
  customHeight: DimensionValue;
  children: ReactNode;
  onClose: () => void;
  loading: boolean;
}
export interface DistanceOption {
  label: string;
  value: number;
}
type IconType = "home" | "map" | "search";
export interface Tab {
  name: string;
  title: string;
  icon: IconType;
  param? : {
    data1: string,
    data2: string
  }
}
export interface MapProps {
  lat: number,
  lng: number
}
export interface SearchDetails {
  ccbaKdcd: string, 
  ccbaAsno: string, 
  ccbaCtcd: string
}