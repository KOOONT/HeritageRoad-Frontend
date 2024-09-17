import { ReactNode } from "react";
import { DimensionValue } from "react-native";

export interface HeritageItem {
  ccbaAsno: string;
  ccmaName: string;
  ccbaMnm1: string;
  ccbaCtcdNm: string;
  ccsiName: string;
  ccbaKdcd: string;
  ccbaCtcd: string;
  imageUrl: string;
}
export interface HeritageDetails {
  ccbaKdcd: string;
  ccbaAsno: string;
  ccbaCtcd: string;
  ccbaCpno: string;
  longitude: string;
  latitude: string;
  ccmaName: string;
  crltsnoNm: string;
  ccbaMnm1: string;
  ccbaMnm2: string;
  gcodeName: string;
  bcodeName: string;
  mcodeName: string;
  scodeName: string;
  ccbaQuan: string;
  ccbaAsdt: string;
  ccbaCtcdNm: string;
  ccsiName: string;
  ccbaLcad: string;
  ccceName: string;
  ccbaPoss: string;
  ccbaAdmin: string;
  ccbaCncl: string;
  ccbaCndt: string;
  videoUrl: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  content: string;
}
export interface HeritageList {
  items: HeritageItem[];
}
export interface Marker {
  latitude: string,
  longitude: string,
  code: string,
  name: string
}
export interface MapState {
  selectedData: HeritageDetails | null;
  relatedMarkers: Marker[];
}
export interface HistoryItem {
  id: string; //unique id(key)
  value: string;
}
export interface SearchState {
  loading: boolean,
  searchQuery: string;
  searchHistory: HistoryItem[];
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
    data2: string,
  }
}
export interface SearchDetails {
  ccbaKdcd: string, 
  ccbaAsno: string, 
  ccbaCtcd: string
}