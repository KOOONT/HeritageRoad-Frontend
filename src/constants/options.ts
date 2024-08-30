import { DistanceOption, Tab }from '../types';

export const LATITUDE_DEFAULT = "37.55";
export const LONGITUDE_DEFAULT = "126.97";
export const LATITUDE_DELTA = 0.06;
export const LONGITUDE_DELTA = 0.06;

export const DISTANCE_OPTIONS: DistanceOption[] = [
  { label: '1 km', value: 1 },
  { label: '2 km', value: 2},
  { label: '5 km', value: 5 },
  { label: '10 km', value: 10 },
  { label: '20 km', value: 20 },
];
export const TABS: Tab[]= [
  { name: 'index', title: '홈', icon: 'home' },
  { name: 'maps/[...data]', title: '지도', icon: 'map' , 
    param: { data1: LATITUDE_DEFAULT, data2: LONGITUDE_DEFAULT }},
  { name: 'search', title: '검색', icon: 'search' },
]