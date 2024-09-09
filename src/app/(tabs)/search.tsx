import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@rneui/themed';
import TitleContainer from '../../components/common/TitleContainer';
import HistoryList from '../../components/search/HistoryList';
import Input from '../../components/search/SearchInput';
import { selectSearchData } from '../../redux/selectors/searchSelectors';

const Search = () => {
  const { theme } = useTheme();

  const { searchHistory, searchResult } = useSelector(selectSearchData);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Input />
      {searchHistory.length > 0 && (
        <HistoryList />
      )}
      <TitleContainer title='추천검색어' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default Search;