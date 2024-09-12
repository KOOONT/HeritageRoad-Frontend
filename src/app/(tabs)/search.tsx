import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@rneui/themed';
import HistoryList from '../../components/search/HistoryList';
import Input from '../../components/search/SearchInput';
import { selectSearchData } from '../../redux/selectors/searchSelectors';
import Recommend from '../../components/search/Recommend';
import SearchResultList from '../../components/search/SearchResultList';
import { RootState } from '../../redux/store';

const Search = () => {
  const { theme } = useTheme();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const { searchHistory, searchResult } = useSelector(selectSearchData);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Input />
      {/** 검색어가 입력된 상태면 검색결과를 보여준다. */}
      {searchQuery ? (
        <SearchResultList />
      ) : (
        <>
          {searchHistory.length > 0 && <HistoryList />}
          <Recommend />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default Search;