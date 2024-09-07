import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import Input from '../../components/search/Input';
import TitleContainer from '../../components/common/TitleContainer';

const Search = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Input />
      <TitleContainer title='최근검색어' sideButton='모두지우기'/>
      <TitleContainer title='추천검색어'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  historyContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearText: {
    fontSize: 14,
  },
});

export default Search;