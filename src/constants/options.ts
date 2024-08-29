import { DistanceOption, Tab }from '../types';

export const DISTANCE_OPTIONS: DistanceOption[] = [
  { label: '1 km', value: 1 },
  { label: '2 km', value: 2},
  { label: '5 km', value: 5 },
  { label: '10 km', value: 10 },
  { label: '20 km', value: 20 },
];

export const TABS: Tab[]= [
  { name: 'index', title: '홈', icon: 'home' },
  { name: 'maps', title: '지도', icon: 'map' },
  { name: 'search', title: '검색', icon: 'search' },
]