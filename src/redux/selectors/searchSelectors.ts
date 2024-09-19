import { createSelector } from 'reselect';
import { RootState } from '../store';

// 기본 selector
const selectSearchHistory = (state: RootState) => state.search.searchHistory;

// 메모이제이션된 selector 정의
export const selectSearchData = createSelector(
  [selectSearchHistory],
  (searchHistory) => ({
    searchHistory,
  })
);