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
export interface HeritageImage {
  imageUrl: string,
  description: string
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
  content: string;
  videoUrl: string;
  images: HeritageImage[]
}
export interface HeritageList {
  items: HeritageItem[];
}
export interface HeritageAll {
  totalCnt: number,
  heritageItems: HeritageItem[]
}
export interface Marker {
  latitude: string,
  longitude: string,
  code: string,
  name: string
}
export interface MapState {
  selectedData: HeritageDetails | null;
  relatedMarkers: RelatedItem[];
}
export interface HistoryItem {
  id: string; //unique id(key)
  value: string;
}
export interface SearchState {
  searchHistory: HistoryItem[]; //최근검색어
}
export interface BottomModalProps {
  title: string;
  subTitle: string;
  isVisible: boolean;
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
export interface ResultListProps { //검색결과 리스트
  isLoading: boolean; 
  isError: boolean;
  isSuccess: boolean; 
  data: HeritageItem[];
  handleLoadMore: () => void;
  isFetchingNextPage: boolean
}
export interface RelatedList {
  accommodations: RelatedItem[];
  restaurants: RelatedItem[];
  relatedAttractions: RelatedItem[]
}
export interface RelatedItem {
  contentId: string,
  title: string;
  addr: string;
  addr2: string;
  addr3: string;
  firstImage: string;
  mapX: string;
  mapY: string;
  contentTypeId: string;
}