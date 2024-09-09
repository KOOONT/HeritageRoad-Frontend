import { createSelector } from 'reselect';
import { RootState } from '../store';

// 기본 selector
const selectSearchHistory = (state: RootState) => state.search.searchHistory;
const selectSearchResult = (state: RootState) => state.search.result;

// 메모이제이션된 selector 정의
export const selectSearchData = createSelector(
  [selectSearchHistory, selectSearchResult],
  (searchHistory, searchResult) => ({
    searchHistory,
    searchResult
  })
);