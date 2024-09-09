import React, { useState } from 'react'
import { SearchBar, useTheme } from '@rneui/themed'
import { NativeSyntheticEvent, StyleSheet, TextInputSubmitEditingEventData, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useSearchHistory from '../../hooks/search/useSearchHistory';
import { RootState } from '../../redux/store';
import { setSearchQuery } from '../../redux/slices/searchSlice';

const Input = () => {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { fetchSearchResults } = useSearchHistory();

  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  
  const handleSubmitEditing = async (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const query = e.nativeEvent.text;
    setLoading(true);
    await fetchSearchResults(query);
    setLoading(false);
  };

  return (
    <View style={styles.barContainer}>
      <SearchBar
        placeholder="지역, 국가유산을 검색해주세요."
        onChangeText={(query) => dispatch(setSearchQuery(query))}
        value={searchQuery}
        lightTheme={theme.mode === "light"}
        showLoading={loading}
        searchIcon={{color: theme.colors.black, size: 20}}
        inputStyle={{color: theme.colors.grey3, fontSize: 15}}
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