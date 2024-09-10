import React, { useState } from 'react'
import { SearchBar, useTheme } from '@rneui/themed'
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSearchQuery } from '../../redux/slices/searchSlice';
import useSearchHistory from '../../hooks/search/useSearchHistory';

const Input = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  
  const { fetchSearchResults } = useSearchHistory();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  
  const handleSubmitEditing = async (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const query = e.nativeEvent.text;
    await fetchSearchResults(query);
  };

  return (
    <View style={styles.barContainer}>
      <SearchBar
        placeholder="지역, 국가유산을 검색해주세요."
        onChangeText={(query) => dispatch(setSearchQuery(query))}
        value={searchQuery}
        lightTheme={theme.mode === "light"}
        showLoading={false}
        searchIcon={{color: theme.colors.black, size: 20}}
        inputStyle={{color: theme.colors.black, fontSize: 15}}
        inputContainerStyle={{backgroundColor: theme.colors.searchBg, margin: 10, paddingLeft: 5}}
        containerStyle={{backgroundColor: theme.colors.background, borderColor: theme.colors.background}}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  barContainer: {
    width: '100%',
  },

});

export default Input