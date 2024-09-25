import { DistanceOption, Tab }from '../types';

export const LATITUDE_DEFAULT = "37.55";
export const LONGITUDE_DEFAULT = "126.97";
export const LATITUDE_DELTA = 0.06;
export const LONGITUDE_DELTA = 0.06;

export const TABS: Tab[]= [
  { name: 'index', title: '홈', icon: 'home' },
  { name: 'maps/[...data]', title: '지도', icon: 'map' , 
    param: { data1: LATITUDE_DEFAULT, data2: LONGITUDE_DEFAULT }},
  { name: 'search', title: '검색', icon: 'search' },
]

export const RECOMMEND = [
  "창덕궁", 
  "해인사",
  "경주",
  "경복궁",
  "불국사",
  "석굴암",
  "덕수궁",
  "종묘",
  "화성",
  "서원",
  "하회",
  "제주",
  "고창"
];