import React, { useState } from 'react'
import { SearchBar, useTheme, useThemeMode } from '@rneui/themed'
import { StyleSheet, View } from 'react-native';
import { getHeritages } from '../../api/api';

const Input = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const updateSearch = (search: string) => {
    setSearch(search);
  }
  const searchData = async () => {
    console.log('search: ', search);

    //TODO: Call Search API
    try {
      setLoading(true);
      const result = await getHeritages();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.barContainer}>
      <SearchBar
        placeholder="지역, 국가유산을 검색해주세요."
        onChangeText={updateSearch}
        value={search}
        lightTheme={theme.mode === "light"}
        showLoading={loading}
        searchIcon={{color: theme.colors.black, size: 20}}
        inputStyle={{color: theme.colors.grey3, fontSize: 15}}
        inputContainerStyle={{backgroundColor: theme.colors.searchBg, margin: 10, paddingLeft: 5}}
        containerStyle={{backgroundColor: theme.colors.background, borderColor: theme.colors.background}}
        onSubmitEditing={searchData}
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